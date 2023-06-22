import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import api from '../services/api';
import { useNavigation } from '@react-navigation/native';
import { convertMinutesToHours } from '../utils/convertMinutesToHours';

function Home() {
  const [movies, setMovies] = useState([])
  const [genres, setGenres] = useState([])

  const navigation = useNavigation();

  useEffect(() => {
    getMovies();
    getGenres();
  }, [])

  async function getMovies() {
    const response = await api.get('/movie', {
      params: {
        size: 10
      }
    })

    setMovies(response.data.data)
  }
  
  async function getGenres() {
    const response = await api.get('/genre', {
      params: {
        all: 'true'
      }
    })

    setGenres(response.data.data)
  }

  function handleGenre(genre) {
    navigation.navigate('Genre', { genre })
  }

  function renderMovieItem({ item, index }) {
    return (
      <TouchableOpacity
        style={styles.movieItem}
        onPress={() => navigation.navigate('Movie', { movie: item })}
      >
        <Image source={{ uri: item.cover}} style={styles.movieItemCover} />
        <Text style={styles.movieItemName}>{item.name}</Text>
        <Text style={styles.movieItemDuration}>{convertMinutesToHours(item.duration)}</Text>
      </TouchableOpacity>
    )
  }

  function renderGenreItem({ item, index }) {
    return (
      <TouchableOpacity style={[styles.genreItem, { backgroundColor: item.color }]} onPress={() => handleGenre(item.name)}>
        <Text style={styles.genreItemText}>{item.name}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.movieTitle}>Recomendados {`\n`}para você:</Text>
        <FlatList horizontal data={movies} style={styles.movieList} renderItem={renderMovieItem}/>
        <Text style={styles.movieTitle}>Categorias {`\n`}de filmes:</Text>
        <FlatList horizontal data={genres} style={styles.genreList} renderItem={renderGenreItem}/>
      </View>
      {/* {movies.map(movie => (
        <Text key={movie.id}>{movie.name}</Text>
      ))} */}
    </View>
  );
}

export default Home;

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