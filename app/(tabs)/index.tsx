import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function TabOneScreen() {
  const navigation = useNavigation();

  const handleLoginPress = () => {
    navigation.navigate('search');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏀</Text>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="usuario"
        placeholderTextColor="white"
      />
      <TextInput
        style={styles.input}
        placeholder="senha"
        placeholderTextColor="white"
        secureTextEntry={true}
      />
      <TouchableOpacity onPress={handleLoginPress}>
        <View style={styles.loginButton}>
          <Text style={styles.loginButtonText}>entrar</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
    color: 'white',
  },
  loginButton: {
    backgroundColor: 'orange',
    width: '250%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
