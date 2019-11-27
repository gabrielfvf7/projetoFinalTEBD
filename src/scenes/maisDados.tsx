import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button, Avatar } from 'react-native-elements';
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
		profissao: null,
		rg: null,
		cpf: null,
		endereco: null,
		escolaridade: null
	};

	public render() {
		const { container, input } = styles;
		const { profissao, rg, cpf, endereco, escolaridade } = this.state;

		console.log(this.props.userData);

		return (
			<View style={container}>
				<Input
					inputContainerStyle={input}
					placeholderTextColor={'white'}
					inputStyle={{ color: 'white' }}
					placeholder={'Endereço'}
					onChangeText={(endereco: string) =>
						this.setState({ endereco })
					}
					value={endereco}
				/>
				<Input
					inputContainerStyle={input}
					placeholderTextColor={'white'}
					inputStyle={{ color: 'white' }}
					placeholder={'Escolaridade'}
					onChangeText={(escolaridade: string) =>
						this.setState({ escolaridade })
					}
					value={escolaridade}
				/>
				<Input
					inputContainerStyle={input}
					placeholderTextColor={'white'}
					inputStyle={{ color: 'white' }}
					placeholder={'Profissão'}
					onChangeText={(profissao: string) =>
						this.setState({ profissao })
					}
					value={profissao}
				/>
				<Input
					inputContainerStyle={input}
					placeholderTextColor={'white'}
					inputStyle={{ color: 'white' }}
					placeholder={'RG'}
					onChangeText={(rg: string) => this.setState({ rg })}
					value={rg}
				/>
				<Input
					inputContainerStyle={input}
					placeholderTextColor={'white'}
					inputStyle={{ color: 'white' }}
					placeholder={'CPF'}
					onChangeText={(cpf: string) => this.setState({ cpf })}
					value={cpf}
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
