import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button, Avatar } from 'react-native-elements';

export default function avatarScene() {
	const { container, input } = styles;

	return (
		<View style={container}>
			<Avatar rounded size="xlarge" />
			<Input
				inputContainerStyle={input}
				placeholderTextColor={'white'}
				inputStyle={{ color: 'white' }}
				placeholder={'Nome'}
			/>
			<Input
				inputContainerStyle={input}
				placeholderTextColor={'white'}
				inputStyle={{ color: 'white' }}
				placeholder={'Sobrenome'}
			/>
			<Button title={'Próximo'} />
		</View>
	);
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
