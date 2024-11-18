import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          senha: password,
        }),
      });

      if (response.status === 404) {
        alert('ERRO: Usuário não cadastrado!');
      } else if (response.status === 406) {
        alert('ERRO: Preencha todos os campos!');
      } else if (response.status === 403) {
        alert('ERRO: Senha incorreta!');
      } else if (response.status === 200) {
        navigation.navigate('Home');
      } else if (response.status === 500) {
        alert('ERRO: Ocorreu um erro inesperado');
      } else {
        alert('ERRO: Resposta desconhecida do servidor');
      }
    } catch (error) {
      alert('ERRO: Não foi possível conectar ao servidor');
    }
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#9c88d1"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#9c88d1"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerText}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f4ff',
  },
  container: {
    width: '90%',
    maxWidth: 400,
    padding: 24,
    borderRadius: 12,
    backgroundColor: '#dcd6f7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6b4fd8', 
    marginBottom: 24,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#ebe6ff',
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 16,
    color: '#6b4fd8', 
    borderColor: '#dcd6f7',
    borderWidth: 1,
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: '#9c88d1', 
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  registerText: {
    fontSize: 14,
    color: '#6b4fd8',
    marginTop: 10,
  },
});

export default Login;
