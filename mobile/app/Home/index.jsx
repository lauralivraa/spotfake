import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Home = () => {
  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.text}>Bem-vindo à Home!</Text>
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
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6b4fd8',
    textAlign: 'center',
  },
});

export default Home;
