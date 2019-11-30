import React, { Component } from 'react';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

interface maisDadosProps {
	idDoc: string;
	userData: Object;
}

interface maisDadosState {
	profissao: string;
	rg: string;
	cpf: string;
	endereco: string;
	escolaridade: string;
}

export default class maisDados extends Component<maisDadosProps> {
	public state: maisDadosState = {
		profissao: '',
		rg: '',
		cpf: '',
		endereco: '',
		escolaridade: ''
	};

	public render() {
		const { container, input } = styles;
		const { profissao, rg, cpf, endereco, escolaridade } = this.state;

		return (
			<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
				<View style={container}>
					<View
						style={{
							borderRadius: 8,
							borderWidth: 3,
							borderColor: 'black',
							backgroundColor: 'white',
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
							E agora, precisa ainda preencher mais esses dados:
						</Text>
					</View>

					<Input
						inputContainerStyle={input}
						placeholderTextColor={'black'}
						inputStyle={{ color: 'black' }}
						placeholder={'Endereço'}
						onChangeText={(endereco: string) =>
							this.setState({ endereco })
						}
						value={endereco}
					/>
					<Input
						inputContainerStyle={input}
						placeholderTextColor={'black'}
						inputStyle={{ color: 'black' }}
						placeholder={'Escolaridade'}
						onChangeText={(escolaridade: string) =>
							this.setState({ escolaridade })
						}
						value={escolaridade}
					/>
					<Input
						inputContainerStyle={input}
						placeholderTextColor={'black'}
						inputStyle={{ color: 'black' }}
						placeholder={'Profissão'}
						onChangeText={(profissao: string) =>
							this.setState({ profissao })
						}
						value={profissao}
					/>
					<Input
						inputContainerStyle={input}
						placeholderTextColor={'black'}
						inputStyle={{ color: 'black' }}
						keyboardType={'numeric'}
						placeholder={'RG'}
						onChangeText={(rg: string) => this.setState({ rg })}
						value={rg}
					/>
					<Input
						inputContainerStyle={input}
						placeholderTextColor={'black'}
						inputStyle={{ color: 'black' }}
						keyboardType={'numeric'}
						placeholder={'CPF'}
						onChangeText={(cpf: string) => this.setState({ cpf })}
						value={cpf}
					/>

					<Button
						title={'PRÓXIMO'}
						buttonStyle={{
							marginTop: 15,
							borderColor: 'black',
							borderWidth: 2
						}}
						titleStyle={{ fontSize: 22 }}
						onPress={() =>
							Actions.privacy({
								idDoc: this.props.idDoc,
								userData: {
									...this.props.userData,
									cpf,
									rg,
									profissao,
									escolaridade,
									endereco
								}
							})
						}
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
		borderWidth: 2
	}
});
