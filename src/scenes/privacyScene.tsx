import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { user } from '../interfaces/user';
require('firebase/firestore');

interface privacySceneProps {
	idDoc: string;
	userData: user;
}

interface privacySceneState {
	loading: boolean;
	btnLoading: boolean;
	nome: boolean;
	sobrenome: boolean;
	idade: boolean;
	endereco: boolean;
	cpf: boolean;
	rg: boolean;
	profissao: boolean;
	escolaridade: boolean;
	avatar: boolean;
	outrosData: object;
}

export default class privacyScene extends Component<
	privacySceneProps,
	privacySceneState
> {
	public state: privacySceneState = {
		loading: true,
		btnLoading: false,
		nome: true,
		sobrenome: true,
		idade: true,
		rg: true,
		cpf: true,
		profissao: true,
		escolaridade: true,
		endereco: true,
		avatar: true,
		outrosData: null
	};

	public componentDidMount() {
		if (!firebase.apps.length) {
			firebase.initializeApp(firebaseConfig);
		}
		this.preencherCampos();
	}

	preencherCampos() {
		const firestore = firebase.firestore();
		const ref = firestore.collection('users').doc(this.props.idDoc);

		ref.get().then(snapshot => {
			const user = snapshot.data().dados_dele;
			const outroData = snapshot.data().dados_outros;
			this.setState({
				nome: user.nome,
				sobrenome: user.sobrenome,
				idade: user.idade,
				rg: user.rg,
				cpf: user.rg,
				profissao: user.profissao,
				escolaridade: user.escolaridade,
				endereco: user.endereco,
				avatar: user.avatar,
				outrosData: {
					...outroData
				},
				loading: false
			});
		});
	}

	enviarEscolhas() {
		this.setState({ btnLoading: true });
		const firestore = firebase.firestore();
		const ref = firestore.collection('users');

		ref.doc(this.props.idDoc)
			.update({
				dados_dele: {
					nome: this.state.nome,
					sobrenome: this.state.sobrenome,
					idade: this.state.idade,
					avatar: this.state.avatar,
					profissao: this.state.profissao,
					escolaridade: this.state.escolaridade,
					rg: this.state.rg,
					cpf: this.state.cpf,
					endereco: this.state.endereco
				},
				dados_outros: this.state.outrosData
			})
			.then(() => {
				this.setState({ btnLoading: false });
				Actions.privacyOutro();
			})
			.catch(erro => console.log(erro));
	}

	public render() {
		const { button, buttonDisabled, container } = styles;
		const {
			nome,
			sobrenome,
			idade,
			avatar,
			endereco,
			escolaridade,
			rg,
			cpf,
			profissao
		} = this.state;

		return this.state.loading ? (
			<View style={container}>
				<ActivityIndicator />
			</View>
		) : (
			<View style={container}>
				<Button
					buttonStyle={nome ? button : buttonDisabled}
					title={this.props.userData.nome}
					onPress={() => this.setState({ nome: !nome })}
				/>
				<Button
					buttonStyle={sobrenome ? button : buttonDisabled}
					title={this.props.userData.sobrenome}
					onPress={() => this.setState({ sobrenome: !sobrenome })}
				/>
				<Button
					buttonStyle={idade ? button : buttonDisabled}
					title={'Idade'}
					onPress={() => this.setState({ idade: !idade })}
				/>
				<Button
					buttonStyle={profissao ? button : buttonDisabled}
					title={'Profissão'}
					onPress={() => this.setState({ profissao: !profissao })}
				/>
				<Button
					buttonStyle={escolaridade ? button : buttonDisabled}
					title={'Escolaridade'}
					onPress={() =>
						this.setState({ escolaridade: !escolaridade })
					}
				/>
				<Button
					buttonStyle={rg ? button : buttonDisabled}
					title={'RG'}
					onPress={() => this.setState({ rg: !rg })}
				/>
				<Button
					buttonStyle={cpf ? button : buttonDisabled}
					title={'CPF'}
					onPress={() => this.setState({ cpf: !cpf })}
				/>
				<Button
					buttonStyle={endereco ? button : buttonDisabled}
					title={'Endereço'}
					onPress={() => this.setState({ endereco: !endereco })}
				/>
				<Button
					buttonStyle={avatar ? button : buttonDisabled}
					title={'Avatar'}
					onPress={() => this.setState({ avatar: !avatar })}
				/>
				<Button
					buttonStyle={button}
					title={'Enviar'}
					loading={this.state.btnLoading}
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
