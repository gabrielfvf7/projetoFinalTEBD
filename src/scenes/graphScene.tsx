import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import firebase from 'firebase';
import { PieChart } from 'react-native-svg-charts';
import { Text } from 'react-native-elements';
require('firebase/firestore');

interface graphSceneProps {
	idDoc: string;
}

interface graphSceneState {
	loading: boolean;
	dadosDeles: Array<number>;
	cores: Array<string>;
}

export default class graphScene extends Component<
	graphSceneProps,
	graphSceneState
> {
	public state: graphSceneState = {
		loading: true,
		dadosDeles: [],
		cores: []
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
		ref.get()
			.then(snapshot => {
				snapshot.forEach(doc => {
					const user: Object = doc.data().dados_dele;
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
					dadosDeles: data,
					loading: false
				});
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

	public render() {
		const { container } = styles;
		const data = this.state.dadosDeles;

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
			<View>
				<PieChart
					style={{
						height: 200,
						marginHorizontal: 20
					}}
					data={pieData}
					innerRadius={0}
				/>
				<Text
					style={{
						color: this.state.cores[0],
						alignSelf: 'center',
						justifyContent: 'center'
					}}
				>
					{'avatar: ' + this.state.dadosDeles[0]}
				</Text>
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
