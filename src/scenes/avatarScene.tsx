import React, { Component } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Input, Button, Avatar } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

interface avatarSceneProps {
	idDoc: string;
}

interface avatarSceneState {
	nome: string;
	sobrenome: string;
	idade: string;
	avatar: string;
}

export default class avatarScene extends Component<
	avatarSceneProps,
	avatarSceneState
> {
	public state: avatarSceneState = {
		nome: null,
		sobrenome: '',
		idade: null,
		avatar: null
	};

	public async escolheImagem() {
		const { status: cameraPermission } = await Permissions.askAsync(
			Permissions.CAMERA
		);
		const { status: cameraRollPermission } = await Permissions.askAsync(
			Permissions.CAMERA_ROLL
		);
		if (
			cameraPermission === 'granted' &&
			cameraRollPermission === 'granted'
		) {
			const result = await ImagePicker.launchImageLibraryAsync();
			console.log(result);
		} else {
			Alert.alert('Permissão negada');
		}
	}

	public render() {
		const { container, input } = styles;

		return (
			<View style={container}>
				<Avatar
					rounded
					size="xlarge"
					source={{ uri: this.state.avatar }}
					onPress={() => this.escolheImagem()}
				/>
				<Input
					inputContainerStyle={input}
					placeholderTextColor={'white'}
					inputStyle={{ color: 'white' }}
					placeholder={'Nome'}
					onChangeText={(nome: string) => this.setState({ nome })}
					value={this.state.nome}
				/>
				<Input
					inputContainerStyle={input}
					placeholderTextColor={'white'}
					inputStyle={{ color: 'white' }}
					placeholder={'Sobrenome'}
					onChangeText={(sobrenome: string) =>
						this.setState({ sobrenome })
					}
					value={this.state.sobrenome}
				/>
				<Input
					inputContainerStyle={input}
					placeholderTextColor={'white'}
					inputStyle={{ color: 'white' }}
					placeholder={'Idade'}
					keyboardType={'numeric'}
					onChangeText={(idade: string) => this.setState({ idade })}
					value={this.state.idade}
				/>
				<Button
					title={'Próximo'}
					buttonStyle={{ marginTop: 15 }}
					onPress={() =>
						Actions.privacy({
							idDoc: this.props.idDoc,
							userData: {
								nome: this.state.nome,
								sobrenome: this.state.sobrenome,
								idade: this.state.idade,
								avatar: this.state.avatar
							}
						})
					}
				/>
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
