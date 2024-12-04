  import React, { useState } from 'react';
  import { View, Text, StyleSheet, FlatList, Image, ScrollView, TouchableOpacity, Modal } from 'react-native';
  import { Ionicons } from '@expo/vector-icons';

  export default function HomeScreen({ navigation }) {
    const [selectedMusic, setSelectedMusic] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const playlists = [
      { id: '1', title: 'Pop Hits', cover: 'https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84a24d4174dcb8919de8c57194' },
      { id: '2', title: 'Rock Classics', cover: 'https://cdn-images.dzcdn.net/images/cover/c04bb27e786e851ab9c8f20cfdadd446/0x1900-000000-80-0-0.jpg' },
      { id: '3', title: 'Indie Vibes', cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQa_TiS9ohpaGHlVbiimGNfDNlsQnqcIZOTg&s' },
      { id: '4', title: 'Hip Hop Essentials', cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaPZ1-kztLuwxswWLOSOdE8_P_phjEF8OyVQ&s' },
      { id: '5', title: 'Electronic Beats', cover: 'https://i.scdn.co/image/ab6765630000ba8a4355d2905d29a88e2332d47d' },
    ];

    const artists = [
      { id: '11', title: 'Mc Ig', cover: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSAOjhUzY3eMu-XOV7JiuQEhqMspth0e2VnPGxjKPJEywqTyPcxhouLl19Q1JvJWmS0UuzjetSf6sMdl3f1wjOEZg' },
      { id: '12', title: 'Mc Ryan', cover: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT7TtEy7_7-AYkf8Wbzzv3u8ov60oc7Zs-Wem6-N2SSjDrH70kVAaEgnnx_j6FBsS0o_LVvV93nOIg_hSQy0BXocg' },
      { id: '13', title: 'Mc Tatu', cover: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS-Fus90JmKZ9D5Kbl9WacepMeh2gUJs-JWBcky5RwB90Lwqfet-DE--8VW0Mlj0kEeAamnSE2td9jMYg_fYnsfNA' },
      { id: '14', title: 'Mc Hariel', cover: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcToZ30K88LE15_JM1vRYW4o-RCD_PbyUB0hrXy6rJ6wsGdSpTzRf7ff517ALbLSejRl4yNLDG7RsZYsuhi8tFIvxQ' },
      { id: '15', title: 'Mc PH', cover: 'https://akamai.sscdn.co/uploadfile/letras/fotos/f/d/3/0/fd3034b70af5f078d153f5964d64d7c2.jpg' },
    ];

    const recentlyPlayed = [
      { id: '6', title: 'Stay', cover: 'https://i.scdn.co/image/ab67616d0000b273c243517f7c5bd216c36d1e3c' },
      { id: '7', title: 'Blinding Lights', cover: 'https://i.scdn.co/image/ab67616d00001e028863bc11d2aa12b54f5aeb36' },
      { id: '8', title: 'Heat Waves', cover: 'https://i.scdn.co/image/ab67616d0000b2739e495fb707973f3390850eea' },
      { id: '9', title: 'Levitating', cover: 'https://i.scdn.co/image/ab67616d0000b2732172b607853fa89cefa2beb4' },
      { id: '10', title: 'Good 4 U', cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPw0rJH7vla3qhNTyBwduuMBVy9B9YWOdiiA&s' },
    ];

    const songs = [
      { id: '1', title: 'Stay', artist: 'The Kid LAROI, Justin Bieber', cover: 'https://i.scdn.co/image/ab67616d0000b273c243517f7c5bd216c36d1e3c', duration: '3:05' },
      { id: '2', title: 'Blinding Lights', artist: 'The Weeknd', cover: 'https://i.scdn.co/image/ab67616d00001e028863bc11d2aa12b54f5aeb36', duration: '2:23' },
      { id: '3', title: 'Heat Waves', artist: 'Glass Animals', cover: 'https://i.scdn.co/image/ab67616d0000b2739e495fb707973f3390850eea', duration: '2:38' },
      { id: '4', title: 'Levitating', artist: 'Dua Lipa, DaBaby', cover: 'https://i.scdn.co/image/ab67616d0000b2732172b607853fa89cefa2beb4', duration: '4:54' },
      { id: '5', title: 'Good 4 U', artist: 'Olivia Rodrigo', cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPw0rJH7vla3qhNTyBwduuMBVy9B9YWOdiiA&s', duration: '3:43' },
    ];

    const openMusicCard = (music) => {
      setSelectedMusic(music);
      setModalVisible(true);
    };

    const closeModal = () => {
      setSelectedMusic(null);
      setModalVisible(false);
    };

    const renderPlaylistItem = ({ item }) => {
      const song = songs.find(song => song.title === item.title);

      return (
        <TouchableOpacity onPress={() => openMusicCard(song)}>
          <View style={styles.playlistItem}>
            <Image source={{ uri: item.cover }} style={styles.playlistImage} />
            <Text style={styles.playlistTitle}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
            <Ionicons name="settings-outline" size={28} color="#fff" />
          </TouchableOpacity>
          <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="cover"
        />
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Ionicons name="log-out-outline" size={28} color="#fff" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.quickPlayContainer}>
            {playlists.slice(0, 6).map((item) => (
              <View key={item.id} style={styles.quickPlayItem}>
                <Image source={{ uri: item.cover }} style={styles.quickPlayImage} />
                <Text style={styles.quickPlayTitle}>{item.title}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Tocadas Recentemente</Text>
          <FlatList
            data={recentlyPlayed}
            renderItem={renderPlaylistItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />

          <Text style={styles.sectionTitle}>Artistas Populares</Text>
          <FlatList
            data={artists}
            renderItem={renderPlaylistItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        </ScrollView>

        <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={closeModal}>
          <View style={styles.modalContainer}>
            <View style={styles.card}>
              {selectedMusic && (
                <>
                  <Image source={{ uri: selectedMusic.cover }} style={styles.cardImage} />
                  <Text style={styles.cardTitle}>{selectedMusic.title}</Text>
                  <Text style={styles.cardArtist}>{selectedMusic.artist}</Text>
                  <Text style={styles.cardDuration}>{selectedMusic.duration}</Text>
                </>
              )}
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Ionicons name="close-circle-outline" size={30} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#dcd6f7',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: 40,
      backgroundColor: '#6b4fd8',
      paddingBottom: 10,
    },
    greeting: {
      fontSize: 26,
      fontWeight: 'bold',
      color: '#fff',
    },
    contentContainer: {
      paddingHorizontal: 16,
      paddingBottom: 80,
    },
    quickPlayContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginBottom: 16,
      flexWrap: 'wrap',
    },
    quickPlayItem: {
      alignItems: 'center',
      marginBottom: 16,
      width: '30%',
      paddingHorizontal: 5,
      borderRadius: 12,
      backgroundColor: '#fff',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
    },
    quickPlayImage: {
      width: 80,
      height: 80,
      borderRadius: 40,
    },
    quickPlayTitle: {
      marginTop: 8,
      fontSize: 14,
      textAlign: 'center',
      color: '#333',
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#6b4fd8',
      marginVertical: 12,
    },
    horizontalList: {
      marginBottom: 16,
    },
    playlistItem: {
      alignItems: 'center',
      marginRight: 12,
      borderRadius: 12,
      backgroundColor: '#fff',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
    },
    playlistImage: {
      width: 120,
      height: 120,
      borderRadius: 12,
    },
    playlistTitle: {
      marginTop: 8,
      fontSize: 14,
      color: '#333',
      textAlign: 'center',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: 12,
      width: 320,
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
    },
    cardImage: {
      width: 220,
      height: 220,
      borderRadius: 12,
    },
    cardTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      marginTop: 12,
      textAlign: 'center',
      color: '#6b4fd8',
    },
    cardArtist: {
      fontSize: 16,
      color: '#888',
      marginTop: 8,
      textAlign: 'center',
    },
    cardDuration: {
      fontSize: 14,
      color: '#888',
      marginTop: 4,
      textAlign: 'center',
    },
    closeButton: {
      position: 'absolute',
      top: 10,
      right: 10,
    },
    logo: {
      width: 120,
      height: 40, 
      borderRadius: 10, 
    },
  });
  
