import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Input, Button, Avatar } from 'react-native-elements';

import firebase from 'firebase';
require('firebase/firestore');

interface privacySceneProps {}

interface privacySceneState {
	nome: boolean;
	sobrenome: boolean;
	loading: boolean;
	doc_id: string;
}

export default class privacyScene extends Component<
	privacySceneProps,
	privacySceneState
> {
	public state: privacySceneState = {
		nome: false,
		sobrenome: false,
		loading: true,
		doc_id: ''
	};

	public componentDidMount() {
		firebase.initializeApp(firebaseConfig);
		this.preencherCampos();
	}

	preencherCampos() {
		const firestore = firebase.firestore();
		const ref = firestore.collection('users');
		const query = ref.where('id_user', '==', 0);
		let user: any;

		query.get().then(snapshot => {
			snapshot.forEach(doc => {
				user = doc.data();
				console.log(user);
				this.setState({
					nome: user.dados_dele.nome,
					sobrenome: user.dados_dele.sobrenome
				});
				this.setState({ loading: false, doc_id: doc.id });
			});
		});
	}

	enviarEscolhas() {
		const firestore = firebase.firestore();
		const ref = firestore.collection('users');

		ref.doc(this.state.doc_id)
			.update({
				'dados_dele.nome': this.state.nome,
				'dados_dele.sobrenome': this.state.sobrenome
			})
			.then(() => console.log('atualizado'))
			.catch(erro => console.log(erro));
	}

	public render() {
		const { button, buttonDisabled, container } = styles;

		return this.state.loading ? (
			<View style={container}>
				<ActivityIndicator />
			</View>
		) : (
			<View style={container}>
				<Button
					buttonStyle={this.state.nome ? button : buttonDisabled}
					title={'Nome'}
					onPress={() => this.setState({ nome: !this.state.nome })}
				/>
				<Button
					buttonStyle={this.state.sobrenome ? button : buttonDisabled}
					title={'Sobrenome'}
					onPress={() =>
						this.setState({ sobrenome: !this.state.sobrenome })
					}
				/>
				<Button
					buttonStyle={button}
					title={'Enviar'}
					onPress={() => this.enviarEscolhas()}
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
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	button: {
		borderRadius: 8,
		paddingHorizontal: 25
	},
	buttonDisabled: {
		borderRadius: 8,
		paddingHorizontal: 25,
		backgroundColor: 'gray'
	}
});
