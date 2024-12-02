import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [email, setEmail] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const getImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      handleSetImage(result.assets[0].uri)
    }
  };

  const handleSetImage = async (url) => {
    try {
      const data = {
        "file": url,
        "upload_preset": 'ml_default',
      };
      const res = await fetch('https://api.cloudinary.com/v1_1/dtrobjlkz/upload', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      console.log(result.url)
    } catch (error) {
      console.err(error);
    }
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem!');
      return;
    }
    try {
      const resposta = await fetch(`http://localhost:8000/autenticacao/${email}/nova_senha`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ senha: newPassword })
      });
      toggleModal();
    } catch (error) {
      console.error('ERROR:', error)
    }
    
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('email');
      if (value !== null) {
        setEmail(value)
      }
    } catch (e) {
      console.log(e)
    }
  };

  useEffect(() => {
    getData()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil do Usuário</Text>
      <TouchableOpacity onPress={getImage} style={styles.avatarContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.avatar} />
        ) : (
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>Foto</Text>
          </View>
        )}
      </TouchableOpacity>
      <Text style={styles.username}>Vitor Mainchein</Text>
      <Text style={styles.email}>vitor@gmail.com</Text>

      <TouchableOpacity style={styles.button} onPress={getImage}>
        <Text style={styles.buttonText}>Editar Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={toggleModal}>
        <Text style={styles.buttonText}>Alterar Senha</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Alterar Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Nova Senha"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirmar Senha"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity style={styles.modalButton} onPress={handlePasswordChange}>
              <Text style={styles.buttonText}>Alterar Senha</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={toggleModal}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#121212',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00bcd4',
    marginVertical: 16,
  },
  avatarContainer: {
    marginVertical: 16,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#00bcd4',
    borderWidth: 2,
  },
  avatarText: {
    color: '#888',
    fontSize: 14,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00bcd4',
    marginTop: 8,
  },
  email: {
    fontSize: 16,
    color: '#888',
    marginBottom: 24,
  },
  button: {
    width: '80%',
    paddingVertical: 12,
    backgroundColor: '#00bcd4',
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Estilos da Modal
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00bcd4',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    padding: 12,
    marginVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    fontSize: 16,
  },
  modalButton: {
    width: '80%',
    paddingVertical: 12,
    backgroundColor: '#00bcd4',
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
});

export default ProfileScreen;