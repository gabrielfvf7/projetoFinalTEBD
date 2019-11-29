import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator, StatusBar } from 'react-native';
import firebase from 'firebase';
import { PieChart } from 'react-native-svg-charts';
import { Text, Button } from 'react-native-elements';
require('firebase/firestore');

interface graphOtherSceneProps {
	idDoc: string;
}

interface graphOtherSceneState {
	loading: boolean;
	dadosOther: Array<number>;
	cores: Array<string>;
	qtd: number;
}

export default class graphScene extends Component<
	graphOtherSceneProps,
	graphOtherSceneState
> {
	public state: graphOtherSceneState = {
		loading: true,
		dadosOther: [],
		cores: [],
		qtd: 0
	};

	public componentDidMount() {
		if (!firebase.apps.length) {
			firebase.initializeApp(firebaseConfig);
		}
		this.parseData();
	}

	public parseData() {
		const firestore = firebase.firestore();
		const ref = firestore.collection('users');

		var data: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0];
		var qtd: number = 0;
		ref.get()
			.then(snapshot => {
				snapshot.forEach(doc => {
					qtd++;
					const user: Object = doc.data().dados_outros;
					var i = 0;
					for (var p in user) {
						user[p] ? (data[i] += 1) : null;
						i++;
					}
				});
			})
			.catch(erro => console.log(erro))
			.finally(() => {
				this.setState({
					dadosOther: data,
					loading: false,
					qtd
				});
				this.setPorcento();
				this.setCores();
			});
	}

	public randomColor = () =>
		('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(
			0,
			7
		);

	public setCores() {
		var cor: Array<string> = ['', '', '', '', '', '', '', '', ''];

		for (var i = 0; i < 9; i++) {
			cor[i] = this.randomColor();
		}
		this.setState({ cores: cor });
	}

	public setPorcento() {
		const { qtd } = this.state;
		var data = this.state.dadosOther;
		for (var i = 0; i < data.length; i++) {
			data[i] = Math.round((data[i] * 100) / qtd);
		}
		this.setState({ dadosOther: data });
	}

	public render() {
		const { container } = styles;
		const data = this.state.dadosOther;

		const pieData = data
			.filter(value => value > 0)
			.map((value, index) => ({
				value,
				svg: {
					fill: this.state.cores[index],
					onPress: () => console.log('press ', index)
				},
				key: `pie-${index}`
			}));

		return this.state.loading ? (
			<View style={container}>
				<ActivityIndicator />
			</View>
		) : (
			<View style={{ marginTop: 25 }}>
				<StatusBar hidden />
				<Text
					style={{
						marginTop: 5,
						marginLeft: 15,
						marginRight: 15,
						fontSize: 30,
						alignSelf: 'center',
						alignContent: 'center',
						alignItems: 'center'
					}}
				>
					Porcentagem de usuários que quiseram visualizar cada dado
					das outras pessoas:
				</Text>
				<PieChart
					style={{
						height: 230,
						marginHorizontal: 20,
						marginTop: 20
					}}
					data={pieData}
					innerRadius={20}
				/>
				<View
					style={{
						alignSelf: 'center',
						alignContent: 'center',
						alignItems: 'center',
						marginTop: 10,
						flexDirection: 'row'
					}}
				>
					<View
						style={{
							flexDirection: 'column',
							justifyContent: 'flex-start',
							marginRight: 20,
							marginLeft: 15
						}}
					>
						<Text
							style={{
								color: this.state.cores[0],
								fontSize: 22
							}}
						>
							{'Avatar: ' + this.state.dadosOther[0]}
						</Text>
						<Text
							style={{
								color: this.state.cores[5],
								marginRight: 15,
								fontSize: 22
							}}
						>
							{`Nome: ${this.state.dadosOther[5]}%`}
						</Text>
						<Text
							style={{
								color: this.state.cores[8],
								fontSize: 22
							}}
						>
							{`Sobrenome: ${this.state.dadosOther[8]}%`}
						</Text>
						<Text
							style={{
								color: this.state.cores[4],
								fontSize: 22
							}}
						>
							{`Idade: ${this.state.dadosOther[4]}%`}
						</Text>
					</View>
					<View
						style={{
							flexDirection: 'column'
						}}
					>
						<Text
							style={{
								color: this.state.cores[3],
								fontSize: 22
							}}
						>
							{`Escolaridade: ${this.state.dadosOther[3]}%`}
						</Text>

						<Text
							style={{
								color: this.state.cores[6],
								fontSize: 22
							}}
						>
							{`Profissão: ${this.state.dadosOther[6]}%`}
						</Text>
						<Text
							style={{
								color: this.state.cores[2],
								fontSize: 22
							}}
						>
							{`Endereço: ${this.state.dadosOther[2]}%`}
						</Text>
						<View style={{ flexDirection: 'row' }}>
							<Text
								style={{
									color: this.state.cores[1],
									fontSize: 22,
									marginRight: 10
								}}
							>
								{`CPF: ${this.state.dadosOther[1]}%`}
							</Text>
							<Text
								style={{
									color: this.state.cores[7],
									fontSize: 22
								}}
							>
								{`RG: ${this.state.dadosOther[7]}%`}
							</Text>
						</View>
					</View>
				</View>
				<Button
					buttonStyle={{
						alignSelf: 'center',
						borderRadius: 8,
						marginTop: 25,
						width: '50%'
					}}
					titleStyle={{
						fontSize: 18,
						fontWeight: 'bold'
					}}
					title={'Ver próximo'}
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
	}
});
