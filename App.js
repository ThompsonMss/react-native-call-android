import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, PermissionsAndroid, TouchableHighlight, Alert } from 'react-native';
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
    RNCallKeep.setAvailable(true);
  });

  useEffect(async () => {
    const status = await RNCallKeep.hasPhoneAccount();
    if (!status) {
      const optionsDefaultNumber = {
        alertTitle: 'Padrão não definido.',
        alertDescription: 'Defina a conta de telefone padrão.'
      };

      RNCallKeep.hasDefaultPhoneAccount(optionsDefaultNumber);
    }
  }, []);

  RNCallKeep.addEventListener('answerCall', ({ callUUID }) => {
    console.log('Usuário Atendeu a Chamada: ', callUUID);
    RNCallKeep.setCurrentCallActive(callUUID);
  });

  RNCallKeep.addEventListener('endCall', ({ callUUID }) => {
    console.log('Usuário Encerrou a Chamada');
  });

  RNCallKeep.addEventListener('didDisplayIncomingCall', ({ error, callUUID, handle, localizedCallerName, hasVideo, fromPushKit }) => {
    // você pode fazer as seguintes ações ao receber este evento: 
    // - iniciar a reprodução de toque se for uma chamada efetuada 
    console.log('Realizando chamda');
  });

  RNCallKeep.addEventListener('didReceiveStartCallAction', ({ handle, callUUID, name }) => {
    console.log('Esse fera aqui mesmo');
  });

  RNCallKeep.addEventListener('didPerformDTMFAction', ({ digits, callUUID }) => {
    console.log('Digito: ', digits);
  });

  function display() {
    const uuid = create_UUID();
    try {
      RNCallKeep.displayIncomingCall(uuid, 'DEDICADO PRÓPRIO', 'Thompson Silva');
      RNCallKeep.answerIncomingCall(uuid)
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  function chamar() {
    const uuid = create_UUID();
    RNCallKeep.startCall(uuid, '+5561993133465', 'Teste Teste');
  }

  function connectionService() {
    const status = RNCallKeep.supportConnectionService();
    Alert.alert('Connection Service disponível: ', status ? 'Sim' : 'Não');
  }

  async function contaTelefone() {
    const status = await RNCallKeep.hasPhoneAccount();
    Alert.alert('Conta Telefone configurada: ', status ? 'Sim' : 'Não');
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

      <TouchableHighlight onPress={() => connectionService()} style={[styles.button, { backgroundColor: '#a99' }]}>
        <Text style={styles.textButton}>Connection Service</Text>
      </TouchableHighlight>

      <TouchableHighlight onPress={() => contaTelefone()} style={[styles.button, { backgroundColor: '#c45d00' }]}>
        <Text style={styles.textButton}>Conta Telefone</Text>
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