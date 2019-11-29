import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Button, Avatar, Text } from 'react-native-elements';
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
				<Text
					style={{
						marginLeft: '10%',
						marginRight: '10%',
						marginBottom: 15,
						fontSize: 20,
						alignSelf: 'center',
						alignContent: 'center',
						alignItems: 'center'
					}}
				>
					E quais dos dados a seguir você gostaria de ver em um outro
					usuário?
				</Text>
				<Avatar
					rounded
					size="xlarge"
					source={{ uri: avatar ? 'https://cdn2.iconfinder.com/data/icons/user-icon-2-1/100/user_5-15-512.png' : null }}
					onPress={() => this.setState({ avatar: !avatar })}
				/>
				<View
					style={{
						margin: 10,
						flexDirection: 'row'
					}}
				>
					<Button
                            buttonStyle={[nome ? button : buttonDisabled, { marginRight: 10 }]}
						title={'Nome'}
						onPress={() => this.setState({ nome: !nome })}
					/>
					<Button
						buttonStyle={sobrenome ? button : buttonDisabled}
						title={'Sobrenome'}
						onPress={() => this.setState({ sobrenome: !sobrenome })}
					/>
				</View>
                <View
					style={{
						margin: 10,
						flexDirection: 'row'
					}}
				>
				<Button
					buttonStyle={[idade ? button : buttonDisabled, {marginRight: 10}]}
					title={'Idade'}
					onPress={() => this.setState({ idade: !idade })}
				/>
                <Button
					buttonStyle={[
						endereco ? button : buttonDisabled,
					]}
					title={'Endereço'}
					onPress={() => this.setState({ endereco: !endereco })}
				/>
                </View>
				<View
					style={{
						margin: 10,
						flexDirection: 'row'
					}}
				>
					<Button
						buttonStyle={[profissao ? button : buttonDisabled, { marginRight: 10 }]}
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
						buttonStyle={[rg ? button : buttonDisabled, { marginRight: 10 }]}
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
					buttonStyle={[button, { margin: 20 }]}
					title={'ENVIAR'}
                    titleStyle={{ fontSize: 25}}
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
