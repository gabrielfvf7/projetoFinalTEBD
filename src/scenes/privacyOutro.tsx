import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';

import firebase from 'firebase';
require('firebase/firestore');

export default class privacyOutro extends Component {
	public render() {
		const { button, buttonDisabled, container } = styles;
		return (
			<View style={container}>
				<Button title={'Próximo'} buttonStyle={button} />
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
