import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button, Avatar } from 'react-native-elements';

const firebase = require('firebase');
require('firebase/firestore');

interface privacySceneProps {}

interface privacySceneState {
	nome: boolean;
	sobrenome: boolean;
}

export default class privacyScene extends Component<
	privacySceneProps,
	privacySceneState
> {
	public state: privacySceneState = {
		nome: false,
		sobrenome: false
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
			});
		});
	}

	public render() {
		const { button, buttonDisabled, container } = styles;

		return (
			<View style={container}>
				<Button
					buttonStyle={!this.state.nome ? button : buttonDisabled}
					title={'Nome'}
					onPress={() => this.setState({ nome: !this.state.nome })}
				/>
				<Button
					buttonStyle={button}
					title={'Sobrenome'}
					disabled={!this.state.sobrenome}
					onPress={() =>
						this.setState({ sobrenome: !this.state.sobrenome })
					}
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
		backgroundColor: 'gray'
	}
});
