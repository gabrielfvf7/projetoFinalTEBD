import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button, Avatar } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

interface maisDadosProps {
	idDoc: string;
	nome: string;
	sobrenome: string;
	idade: string;
	avatar: string;
}

interface maisDadosState {}

export default class maisDados extends Component<maisDadosProps> {
	public render() {
		const { container, input } = styles;

		return (
			<View style={container}>
				<Input style={input} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	input: {
		paddingLeft: 5,
		marginTop: 20,
		marginHorizontal: 30,
		borderColor: 'black',
		backgroundColor: '#79C7FF',
		borderRadius: 8,
		borderWidth: 2
	}
});
