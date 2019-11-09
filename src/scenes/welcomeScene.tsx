import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

export default function welcomeScene() {
  const { container, texto, textoTitulo, button } = styles;

  return (
    <View style={container}>
      <Text style={textoTitulo} >Olá, seja bem vindo! </Text>
      <Text style={texto} >Este é um pequeno aplicativo que visa realizar um experimento sobre o uso de políticas de privacidade nos dias de hoje.
      Será pedido para você inserir informações (não precisam ser verdadeiras) que não serão salvas e realizar escolhas.</Text>
      <Text style={textoTitulo} > Podemos começar? </Text>
      <Button 
        buttonStyle={button} 
        title={"OK!"} 
        titleStyle={{ fontSize: 20 }} 
        onPress={() => Actions.avatar()} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: {
    margin: 15,
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlign: 'justify'
  },
  textoTitulo: {
    fontSize: 25,
    margin: 15,
    justifyContent: 'center',
    textAlign: 'justify'
  },
  button: {
    borderRadius: 8,
    paddingHorizontal: 25
  },
});
