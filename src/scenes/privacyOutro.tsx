import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Button, Avatar } from 'react-native-elements';
import firebase from 'firebase';
import { userBol } from '../interfaces/userBol';
import { Actions } from 'react-native-router-flux';
require('firebase/firestore');

interface privacyOutroProps {
	idDoc: string;
	userData: userBol;
}

interface privacyOutroState {
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
	dados_outros: userBol;
}

export default class privacyOutro extends Component<
	privacyOutroProps,
	privacyOutroState
> {
	public state: privacyOutroState = {
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
		dados_outros: null
	};

	public componentDidMount() {
		if (!firebase.apps.length) {
			firebase.initializeApp(firebaseConfig);
		}
		this.setState({ loading: false });
	}

	enviarEscolhas() {
		this.setState({ btnLoading: true });
		const firestore = firebase.firestore();
		const ref = firestore.collection('users');

		ref.doc(this.props.idDoc)
			.update({
				dados_outros: {
					nome: this.state.nome,
					sobrenome: this.state.sobrenome,
					idade: this.state.idade,
					avatar: this.state.avatar,
					profissao: this.state.profissao,
					escolaridade: this.state.escolaridade,
					rg: this.state.rg,
					cpf: this.state.cpf,
					endereco: this.state.endereco
				}
			})
			.then(() => {
				this.setState({ btnLoading: false });
				Actions.graph({ idDoc: this.props.idDoc });
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
				<Avatar
					rounded
					size="xlarge"
					source={{ uri: null }}
					onPress={() => this.setState({ avatar: !avatar })}
				/>
				<View
					style={{
						margin: 10,
						flexDirection: 'row'
					}}
				>
					<Button
						buttonStyle={nome ? button : buttonDisabled}
						title={'Nome'}
						onPress={() => this.setState({ nome: !nome })}
					/>
					<Button
						buttonStyle={sobrenome ? button : buttonDisabled}
						title={'Sobrenome'}
						onPress={() => this.setState({ sobrenome: !sobrenome })}
					/>
				</View>
				<Button
					buttonStyle={idade ? button : buttonDisabled}
					title={'Idade'}
					onPress={() => this.setState({ idade: !idade })}
				/>
				<View
					style={{
						margin: 10,
						flexDirection: 'row'
					}}
				>
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
				</View>
				<View
					style={{
						margin: 10,
						flexDirection: 'row'
					}}
				>
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
				</View>
				<Button
					buttonStyle={[
						endereco ? button : buttonDisabled,
						{ margin: 10 }
					]}
					title={'Endereço'}
					onPress={() => this.setState({ endereco: !endereco })}
				/>
				<Button
					buttonStyle={[button, { margin: 10 }]}
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
