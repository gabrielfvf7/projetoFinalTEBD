import React, { Component } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { string } from 'prop-types';

interface graphSceneProps {
	idDoc: string;
}

export default class graphScene extends Component<graphSceneProps> {
	public render() {
		return (
			<View>
				<Button></Button>
			</View>
		);
	}
}
