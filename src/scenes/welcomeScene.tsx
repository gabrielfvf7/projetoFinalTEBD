import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	ActivityIndicator,
	ImageBackground
} from 'react-native';
import { Text, Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
require('firebase/firestore');

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
				profissao: true,
				avatar: true,
				escolaridade: true
			},
			dados_outros: {
				nome: true,
				sobrenome: true,
				idade: true,
				rg: true,
				cpf: true,
				endereco: true,
				profissao: true,
				avatar: true,
				escolaridade: true
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
				<ActivityIndicator size="large" />
			</View>
		) : (
			<ImageBackground
				source={require('../assets/imgs/background.png')}
				style={{ width: '100%', height: '100%' }}
			>
				<View style={container}>
					<View
						style={{
							backgroundColor: 'white',
							borderColor: 'black',
							borderWidth: 2,
							borderRadius: 8,
							marginHorizontal: 15,
							marginBottom: 15
						}}
					>
						<Text style={textoTitulo}>Olá, seja bem vindo! </Text>
						<Text style={texto}>
							Este é um pequeno aplicativo que visa realizar um
							experimento sobre o uso de políticas de privacidade
							nos dias de hoje. Será pedido para você inserir
							informações (não precisam ser verdadeiras) que não
							serão salvas e depois realizar algumas escolhas.
						</Text>
						<Text style={textoTitulo}> Podemos começar? </Text>
					</View>
					<Button
						buttonStyle={button}
						title={'OK!'}
						titleStyle={{ fontSize: 30 }}
						onPress={() =>
							Actions.avatar({ idDoc: this.state.idDoc })
						}
					/>
				</View>
			</ImageBackground>
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
		borderColor: 'black',
		borderWidth: 2,
		height: 60,
		width: 95
	}
});
