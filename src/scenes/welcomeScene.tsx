import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';

interface welcomeSceneProps {}

interface welcomeSceneState {
	loading: boolean;
	idDoc: string;
}

export default class welcomeScene extends Component<
	welcomeSceneProps,
	welcomeSceneState
> {
	public state: welcomeSceneState = {
		loading: true,
		idDoc: ''
	};

	public componentDidMount() {
		if (!firebase.apps.length) {
			firebase.initializeApp(firebaseConfig);
		}
		const firestore = firebase.firestore();
		const ref = firestore.collection('users');

		ref.add({
			dados_dele: {
				nome: true,
				sobrenome: true,
				idade: true,
				rg: true,
				cpf: true,
				endereco: true,
				profissao: true
			}
		})
			.then(docRef => {
				this.setState({ idDoc: docRef.id, loading: false });
			})
			.catch(erro => console.log(erro));
	}

	public render() {
		const { container, texto, textoTitulo, button } = styles;

		return this.state.loading ? (
			<View style={container}>
				<ActivityIndicator size={30} />]
			</View>
		) : (
			<View style={container}>
				<Text style={textoTitulo}>Olá, seja bem vindo! </Text>
				<Text style={texto}>
					Este é um pequeno aplicativo que visa realizar um
					experimento sobre o uso de políticas de privacidade nos dias
					de hoje. Será pedido para você inserir informações (não
					precisam ser verdadeiras) que não serão salvas e realizar
					escolhas.
				</Text>
				<Text style={textoTitulo}> Podemos começar? </Text>
				<Button
					buttonStyle={button}
					title={'OK!'}
					titleStyle={{ fontSize: 20 }}
					onPress={() => Actions.avatar({ idDoc: this.state.idDoc })}
				/>
			</View>
		);
	}
}

const firebaseConfig = {
	apiKey: 'AIzaSyCVQBEUIQvk1YCcbm01frGjY0tRVuNutTY',
	authDomain: 'trabalhotebd.firebaseapp.com',
	databaseURL: 'https://trabalhotebd.firebaseio.com',
	projectId: 'trabalhotebd',
	storageBucket: 'trabalhotebd.appspot.com',
	messagingSenderId: '693631680483',
	appId: '1:693631680483:web:122db7fbb8dc5fa83aead6',
	measurementId: 'G-6G9XP23KMP'
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		alignItems: 'center',
		justifyContent: 'center'
	},
	texto: {
		margin: 15,
		fontWeight: 'bold',
		justifyContent: 'center',
		textAlign: 'justify'
	},
	textoTitulo: {
		fontSize: 25,
		margin: 15,
		justifyContent: 'center',
		textAlign: 'justify'
	},
	button: {
		borderRadius: 8,
		paddingHorizontal: 25
	}
});
