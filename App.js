import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, PermissionsAndroid, TouchableHighlight } from 'react-native';
import { v4 } from 'uuid';
import RNCallKeep from 'react-native-callkeep';

export default function App() {

  const options = {
    ios: {
      appName: 'My app name',
    },
    android: {
      alertTitle: 'Permissions required',
      alertDescription: 'This application needs to access your phone accounts',
      cancelButton: 'Cancel',
      okButton: 'ok',
      imageName: 'phone_account_icon',
      additionalPermissions: [PermissionsAndroid.PERMISSIONS.CALL_PHONE]
    }
  };

  function create_UUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

  RNCallKeep.setup(options).then(accepted => {
    console.log('Aceito: ', accepted);
    RNCallKeep.setAvailable(true);
  });

  const optionsDefaultNumber = {
    alertTitle: 'Default not set',
    alertDescription: 'Please set the default phone account'
  };

  RNCallKeep.hasDefaultPhoneAccount(optionsDefaultNumber);

  function display() {
    const uuid = create_UUID();
    try {
      RNCallKeep.displayIncomingCall(uuid, '993133465', 'Thompson Silva');
      RNCallKeep.answerIncomingCall(uuid)
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  function chamar() {
    const uuid = create_UUID();
    RNCallKeep.startCall(uuid, '85236985', 'Teste Teste');
  }

  function verificar() {
    const status = RNCallKeep.supportConnectionService();
    console.log('Preparado: ', status);
    alert('Preparado: ', status);
  }

  async function temNumero() {
    const status = await RNCallKeep.hasPhoneAccount();
    console.log('Numero: ', status);
    alert('Tem número: ', status ? 'Tem' : 'Não');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calls</Text>

      <TouchableHighlight onPress={() => display()} style={[styles.button, { backgroundColor: '#F68' }]}>
        <Text style={styles.textButton}>Receber Chamada</Text>
      </TouchableHighlight>

      <TouchableHighlight onPress={() => chamar()} style={[styles.button, { backgroundColor: '#e98' }]}>
        <Text style={styles.textButton}>Realizar Chamada</Text>
      </TouchableHighlight>

      <TouchableHighlight onPress={() => verificar()} style={[styles.button, { backgroundColor: '#a99' }]}>
        <Text style={styles.textButton}>Connection Service</Text>
      </TouchableHighlight>

      <TouchableHighlight onPress={() => temNumero()} style={[styles.button, { backgroundColor: '#c45d00' }]}>
        <Text style={styles.textButton}>Tem Número</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666'
  },
  permissao: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 30,
    fontWeight: 'bold'
  },
  button: {
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF6800',
    marginBottom: 20
  },
  textButton: {
    color: '#FFF'
  }
});