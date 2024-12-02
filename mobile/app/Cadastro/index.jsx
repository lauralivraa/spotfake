import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Cadastro = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('ERRO: As senhas não coincidem');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/autenticacaoregistro', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: firstName,
          sobrenome: lastName,
          dataNascimento: birthDate,
          email: email,
          senha: password,
        }),
      });

      if (response.status === 400) {
        alert('ERRO: Usuário já cadastrado!');
      } else if (response.status === 406) {
        alert('ERRO: Preencha todos os campos!');
      } else if (response.status === 201) {
        navigation.navigate('Home');
      } else {
        alert('ERRO: Ocorreu um erro inesperado');
      }
    } catch (error) {
      alert('ERRO: Não foi possível conectar ao servidor');
    }
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Cadastrar</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          placeholderTextColor="#9c88d1"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Sobrenome"
          placeholderTextColor="#9c88d1"
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          style={styles.input}
          placeholder="Data de Nascimento (DD/MM/AAAA)"
          placeholderTextColor="#9c88d1"
          keyboardType="numeric"
          value={birthDate}
          onChangeText={setBirthDate}
        />
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
        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha"
          placeholderTextColor="#9c88d1"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>Já tem uma conta? Faça Login</Text>
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
  loginText: {
    fontSize: 14,
    color: '#6b4fd8',
  },
});

export default Cadastro;
