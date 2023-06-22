import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import api from '../services/api';
import { useNavigation } from '@react-navigation/native';
import { convertMinutesToHours } from '../utils/convertMinutesToHours';

function Genre({ route }) {
  const { genre } = route.params;

  const [movies, setMovies] = useState(null)
  const [isEmpty, setIsEmpty] = useState(false)

  const navigation = useNavigation();

  useEffect(() => {
    getMovies();
  }, [])

  async function getMovies() {
    const response = await api.get('/movie', {
      params: {
        all: 'true',
        genre
      }
    })

    setMovies(response.data.data)

    if (response.data.data.length === 0) {
      setIsEmpty(true)
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.movieTitle}>Filmes de {`\n`}{genre}:</Text>
          {isEmpty && <Text style={styles.movieItemName}>Nenhum filme encontrado</Text>}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', flex: 1, justifyContent: 'space-between' }}>
            {movies !== null && movies.map((item, index) => (
              <TouchableOpacity
                style={styles.movieItem}
                onPress={() => navigation.navigate('Movie', { movie: item })}
              >
                <Image source={{ uri: item.cover }} style={styles.movieItemCover} />
                <Text style={styles.movieItemName}>{item.name}</Text>
                <Text style={styles.movieItemDuration}>{convertMinutesToHours(item.duration)}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default Genre;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  section: {
    padding: 18,
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
    maxWidth: 164 + 2 * 6,
  },
  movieItemCover: {
    width: 164,
    height: 270,
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
    borderRadius: 12,
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