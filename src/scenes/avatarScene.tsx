import React, { Component } from 'react';
import { StyleSheet, View, Alert, KeyboardAvoidingView } from 'react-native';
import {
	Input,
	Button,
	Avatar,
	Overlay,
	ListItem,
	Divider,
	Text
} from 'react-native-elements';
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
	isModalOpen: boolean;
	btnLoading: boolean;
}

export default class avatarScene extends Component<
	avatarSceneProps,
	avatarSceneState
> {
	public state: avatarSceneState = {
		nome: null,
		sobrenome: '',
		idade: null,
		avatar: null,
		isModalOpen: false,
		btnLoading: false
	};

	public async escolheImagem(tipo: string) {
		this.setState({ isModalOpen: false });
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
			var result;
			switch (tipo) {
				case 'tirar':
					result = await ImagePicker.launchCameraAsync();
					break;
				case 'escolher':
					result = await ImagePicker.launchImageLibraryAsync();
					break;
			}
			this.setState({ avatar: result.uri });
			console.log(result);
		} else {
			Alert.alert('Permissão negada');
		}
	}

	public render() {
		const { isModalOpen, avatar, nome, sobrenome, idade } = this.state;
		const { container, input } = styles;

		return (
			<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
				<View style={container}>
					<Overlay
						isVisible={isModalOpen}
						onBackdropPress={() =>
							this.setState({ isModalOpen: false })
						}
						overlayStyle={{ borderRadius: 15, height: 'auto' }}
					>
						<View>
							<ListItem
								title={'Tirar foto'}
								onPress={() => this.escolheImagem('tirar')}
							/>
						</View>
						<Divider />
						<View>
							<ListItem
								title={'Escolher imagem da galeria'}
								onPress={() => this.escolheImagem('escolher')}
							/>
						</View>
					</Overlay>
					<View
						style={{
							marginHorizontal: 10,
							marginBottom: 10
						}}
					>
						<Text
							style={{
								fontSize: 20,
								marginHorizontal: 15
							}}
						>
							Você está realizando o cadastro em uma rede social e
							precisa preencher as seguintes informações:
						</Text>
					</View>
					<Avatar
						rounded
						containerStyle={{
							borderColor: 'black',
							borderWidth: 5
						}}
						size="xlarge"
						source={{ uri: avatar }}
						onPress={() => this.setState({ isModalOpen: true })}
					/>
					<Input
						inputContainerStyle={input}
						placeholderTextColor={'black'}
						inputStyle={{ color: 'black' }}
						placeholder={'Nome'}
						onChangeText={(nome: string) => this.setState({ nome })}
						value={nome}
					/>
					<Input
						inputContainerStyle={input}
						placeholderTextColor={'black'}
						inputStyle={{ color: 'black' }}
						placeholder={'Sobrenome'}
						onChangeText={(sobrenome: string) =>
							this.setState({ sobrenome })
						}
						value={sobrenome}
					/>
					<Input
						inputContainerStyle={input}
						placeholderTextColor={'black'}
						inputStyle={{ color: 'black' }}
						placeholder={'Idade'}
						keyboardType={'numeric'}
						onChangeText={(idade: string) =>
							this.setState({ idade })
						}
						value={idade}
					/>
					<Button
						title={'PRÓXIMO'}
						buttonStyle={{
							marginTop: 15,
							borderColor: 'black',
							borderWidth: 2
						}}
						titleStyle={{ fontSize: 22 }}
						loading={this.state.btnLoading}
						onPress={() => {
							this.setState({ btnLoading: true });
							Actions.maisDados({
								idDoc: this.props.idDoc,
								userData: {
									nome,
									sobrenome,
									idade,
									avatar
								}
							});
						}}
					/>
				</View>
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
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
		borderWidth: 3
	}
});
