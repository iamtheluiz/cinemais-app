import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function Landing() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Cinemais</Text>
        <Text style={styles.description}>Gerencie cinemas e sessões de {`\n`} filmes de modo prático e digital!</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Landing;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#9f1239',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    padding: 18,
  },

  title: {
    color: '#000',
    fontSize: 36,
    paddingVertical: 6,
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    color: '#fff',
  },
  description: {
    color: '#000',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
    color: '#fff',
  },
  button: {
    backgroundColor: '#fbbf24',
    borderRadius: 12,
    padding: 12,
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
  },

  movieList: {
    display: 'flex',
  },
  movieItem: {
    maxWidth: 200 + 2 * 6,
    marginRight: 12,
  },
  movieItemCover: {
    width: 200,
    height: 300,
    borderRadius: 12,
  },
  movieItemName: {
    color: '#000',
    fontSize: 16,
    lineHeight: 20,
    paddingVertical: 6,
    textAlign: 'left',
    fontFamily: 'Poppins-Bold'
  },
  movieItemDuration: {
    color: '#000',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'left',
    fontFamily: 'Roboto-Regular',
    marginBottom: 12
  },

  genreList: {
    display: 'flex',
  },
  genreItem: {
    padding: 6,
    marginHorizontal: 4,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',

    width: 120,
    height: 80
  },
  genreItemText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});