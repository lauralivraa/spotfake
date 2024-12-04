import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput, Alert, TouchableOpacity, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {vh, vw} from 'react-native-css-vh-vw'

export default function Perfil() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSendImage = async (imageUri) => {
    try {
      const data = {
        file: imageUri,
        upload_preset: 'ml_default',
      };

      const res = await fetch('https://api.cloudinary.com/v1_1/deq6egrbf/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(`Erro ${res.status}: ${res.statusText}`);
      }

      const result = await res.json();
      setProfileImage(result.url);
      console.log(result)
    } catch (e) {
      console.error('Erro ao enviar imagem:', e);
      Alert.alert('Erro', 'Não foi possível enviar a imagem.');
    }
    
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch('http://192.168.0.100:8000/get.users', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      if (!response.headers.get('content-type')?.includes('application/json')) {
        throw new Error('Resposta não é JSON');
      }

      const userData = await response.json();
      setName(userData.name);
      setEmail(userData.email);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      Alert.alert('Erro', 'Erro ao conectar ao servidor.');
    }
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permissão necessária', 'Permita o acesso à galeria para selecionar uma imagem.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
      handleSendImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    Alert.alert('Perfil atualizado', 'Suas alterações foram salvas.');
  };

  const handleChangePassword = () => {
    if (newPassword === confirmPassword) {
      Alert.alert('Sucesso', 'Senha alterada com sucesso!');
      setIsModalVisible(false);
    } else {
      Alert.alert('Erro', 'As senhas não coincidem.');
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.profileBox}>
        <View style={styles.paddingContainer}>
          <View style={styles.profileHeaderContainer}>
            <TouchableOpacity onPress={pickImage}>
              <Image
                source={profileImage ? { uri: profileImage } : require('../../assets/images/logo.png')}
                style={styles.profileImage}
              />
            </TouchableOpacity>
            {isEditing ? (
              <TextInput
                style={styles.editNameInput}
                value={name}
                onChangeText={(text) => setName(text)}
              />
            ) : (
              <Text style={styles.userName}>{name}</Text>
            )}
            <Text style={styles.userEmail}>{email}</Text>
          </View>

          <TouchableOpacity onPress={isEditing ? handleSave : () => setIsEditing(true)} style={styles.actionButton}>
            <Text style={styles.actionButtonText}>{isEditing ? 'Salvar' : 'Editar Perfil'}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Trocar Senha</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContentBox}>
            <Text style={styles.modalTitle}>Trocar Senha</Text>
            <TextInput
              style={styles.passwordInput}
              placeholder="Nova senha"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TextInput
              style={styles.passwordInput}
              placeholder="Confirmar nova senha"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={handleChangePassword} style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: '#f8f4ff',
      paddingHorizontal: 15, 
      paddingTop: 20,
      justifyContent: 'center',
      width: vw(100)
    },
    profileBox: {
      backgroundColor: '#dcd6f7',
      marginHorizontal: 20, 
      borderRadius: 10,
      padding: 15,
    },
    paddingContainer: {
      margin: 10,
    },
    profileHeaderContainer: {
      alignItems: 'center',
      marginBottom: 20, 
    },
    profileImage: {
      width: 100, 
      height: 100,
      borderRadius: 50,
      marginBottom: 10,
    },
    userName: {
      fontSize: 24, 
      fontWeight: 'bold',
      color: '#6b4fde',
      textAlign: 'center', 
    },
    editNameInput: {
      fontSize: 24, 
      fontWeight: 'bold',
      color: 'white',
      borderBottomWidth: 1,
      borderBottomColor: 'gray',
      marginBottom: 10,
      textAlign: 'center', 
    },
    userEmail: {
      fontSize: 14, 
      color: 'gray',
      textAlign: 'center', 
    },
    actionButton: {
      backgroundColor: '#9c88d1',
      paddingVertical: 12,
      paddingHorizontal: 25,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 20,
    },
    actionButtonText: {
      fontSize: 16,
      color: 'white',
      fontWeight: 'bold',
    },
    modalBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContentBox: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 15,
      width: '80%',
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    passwordInput: {
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 5,
      padding: 12, 
      marginBottom: 15,
      fontSize: 16,
    },
    modalButton: {
      backgroundColor: '#9c88d1',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 10,
    },
    modalButtonText: {
      fontSize: 16,
      color: 'white',
      fontWeight: 'bold',
    },
  });
  