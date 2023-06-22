import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import api from '../services/api';
import * as WebBrowser from 'expo-web-browser';
import { useNavigation } from '@react-navigation/native';

function Movie({ route }) {
  const { movie } = route.params;

  const navigation = useNavigation();

  const handleWatchTrailer = async () => {
    await WebBrowser.openBrowserAsync(movie.trailer);
  };

  function handleGenre(genre) {
    navigation.navigate('Genre', { genre })
  }
  
  function handleCast(cast) {
    navigation.navigate('Cast', { cast })
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.movieTitle}>{movie.name}</Text>
          <Image source={{ uri: movie.cover }} style={styles.movieItemCover} />
          <ScrollView style={{ marginTop: 8 }} horizontal={true}>
            {movie.genres.map((genre, index) => (
              <TouchableOpacity key={index} style={styles.genreItem} onPress={() => handleGenre(genre.name)}>
                <Text style={styles.genreItemText}>{genre.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Text style={[styles.buttonText, { color: '#aaa', textAlign: 'left', marginTop: 6 }]}>{movie.duration} minutos</Text>
          <Text style={[styles.genreItemText, { textAlign: 'left' }]}>{movie.synopsis}</Text>
          <TouchableOpacity style={styles.button} onPress={handleWatchTrailer}>
            <Text style={styles.buttonText}>Ver Trailer</Text>
          </TouchableOpacity>

          <Text style={[styles.movieTitle, { marginTop: 16 }]}>Elenco</Text>
          <ScrollView horizontal={true}>
            {movie.cast.map((cast, index) => (
              <TouchableOpacity key={index} style={styles.castItem} onPress={() => handleCast(cast)}>
                <Image source={{ uri: cast.picture }} style={styles.castItemImage} />
                <Text style={styles.castItemName}>{cast.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          
          {/* <Text style={[styles.movieTitle, { marginTop: 16 }]}>Nos cinemas</Text> */}

        </View>
      </ScrollView>
    </View>
  );
}

export default Movie;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  section: {
    padding: 18,
  },
  trailer: {
    height: 300,
    width: 533.33
  },

  button: {
    backgroundColor: '#fbbf24',
    borderRadius: 12,
    padding: 12,
    marginVertical: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
  },

  movieTitle: {
    color: '#000',
    fontSize: 24,
    lineHeight: 30,
    paddingVertical: 6,
    textAlign: 'left',
    fontFamily: 'Poppins-Bold'
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
    paddingVertical: 16,
    paddingHorizontal: 8,
    marginRight: 4,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    backgroundColor: '#eee',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  genreItemText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  castItem: {
    maxWidth: 100 + 2 * 6,
    marginRight: 12,
  },
  castItemName: {
    color: '#000',
    fontSize: 16,
    lineHeight: 20,
    paddingVertical: 6,
    textAlign: 'center',
    fontFamily: 'Roboto-Medium'
  },
  castItemImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
});