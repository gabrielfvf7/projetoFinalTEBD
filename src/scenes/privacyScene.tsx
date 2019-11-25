import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button, Avatar } from 'react-native-elements';
import * as firebase from firebase;

interface privacySceneProps {
    
}

export class privacyScene extends Component<privacySceneProps> {

    componentWillMount() {

    }

	return (
		<View>
			<Button />
		</View>
	);
}

const firebaseConfig = {
	apiKey: '<YOUR-API-KEY>',
	authDomain: '<YOUR-AUTH-DOMAIN>',
	databaseURL: '<YOUR-DATABASE-URL>',
	storageBucket: '<YOUR-STORAGE-BUCKET>'
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
