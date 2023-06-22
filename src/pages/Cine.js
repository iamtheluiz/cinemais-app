import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import api from '../services/api';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { convertMinutesToHours } from '../utils/convertMinutesToHours';

function Cine({ route }) {
  const { cine } = route.params;
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function getMovies() {
      const response = await api.get(`/cine/${cine.id}/open`)

      setMovies(response.data.data.map(item => item.movie).filter((item, index, array) => {
        return array.map(mapItem => mapItem.id).indexOf(item.id) === index;
      }))
    }
    getMovies();
  }, [])

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.section}>

          <View style={styles.sessionItem}>
            <Image source={{ uri: cine.logo }} style={[styles.movieItemCover, { width: 100, height: 100 }]} />
            <View style={styles.sessionDetails}>
              <Text style={[styles.sessionDetailText, { fontSize: 24, lineHeight: 24}]}>{cine.name}</Text>
              <Text style={styles.sessionDetailText}><FontAwesome5 name="map-marked-alt" size={18} color="black" /> {cine.city.name}</Text>
              <Text style={styles.sessionDetailText}><Feather name="map-pin" size={18} color="black" /> {parseFloat(cine.distance).toFixed(2)} km</Text>
            </View>
          </View>
          <Text style={[styles.movieTitle, { marginTop: 12 }]}>Localização:</Text>
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: parseFloat(cine.latitude),
                longitude: parseFloat(cine.longitude),
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                coordinate={{ latitude: parseFloat(cine.latitude), longitude: parseFloat(cine.longitude) }}
                title={cine.name}
              />
            </MapView>
          </View>
          <Text style={[styles.movieTitle, { marginTop: 12 }]}>Em cartaz:</Text>
          {movies.length === 0 && <Text style={styles.movieItemName}>Nenhum filme encontrado</Text>}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', flex: 1, justifyContent: 'space-between' }}>
            {movies !== null && movies.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.movieItem}
                onPress={() => navigation.navigate('Movie', { movie: item })}
              >
                <Image source={{ uri: item.cover }} style={styles.movieItemCover} />
                <Text style={styles.movieItemName}>{item.name}</Text>
                <Text style={styles.movieItemDuration}>{convertMinutesToHours(item.duration)}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {/* <ScrollView style={{ marginTop: 8 }} horizontal={true}>
            {cine.genres.map((genre, index) => (
              <TouchableOpacity key={index} style={styles.genreItem} onPress={() => handleGenre(genre.name)}>
                <Text style={styles.genreItemText}>{genre.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Text style={[styles.buttonText, { color: '#aaa', textAlign: 'left', marginTop: 6 }]}>{cine.duration} minutos</Text>
          <Text style={[styles.genreItemText, { textAlign: 'left' }]}>{cine.synopsis}</Text>
          <TouchableOpacity style={styles.button} onPress={handleWatchTrailer}>
            <Text style={styles.buttonText}>Ver Trailer</Text>
          </TouchableOpacity>

          <Text style={[styles.movieTitle, { marginTop: 16 }]}>Elenco</Text>
          <ScrollView horizontal={true}>
            {cine.cast.map((cast, index) => (
              <TouchableOpacity key={index} style={styles.castItem} onPress={() => handleCast(cast)}>
                <Image source={{ uri: cast.picture }} style={styles.castItemImage} />
                <Text style={styles.castItemName}>{cast.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={[styles.movieTitle, { marginTop: 16 }]}>Nos cinemas</Text>
          <View style={styles.sessionList}>
            {sessions.map((session, index) => (
              <TouchableOpacity key={index} style={styles.sessionItem} onPress={() => handleCine(session.cine)}>
                <Image source={{ uri: session.cine.logo }} style={styles.castItemImage} />
                <View style={styles.sessionDetails}>
                  <Text style={styles.sessionDetailText}>{session.cine.name}</Text>
                  <Text style={styles.sessionDetailText}>Sala: {session.room}</Text>
                  <Text style={styles.sessionDetailText}><Feather name="calendar" size={18} color="black" /> {session.sessionDate}</Text>
                  <Text style={styles.sessionDetailText}><Feather name="clock" size={18} color="black" /> {session.sessionTime}</Text>
                  <Text style={styles.sessionDetailText}><Feather name="map-pin" size={18} color="black" /> {session.cine.city.name} ({parseFloat(session.cine.distance).toFixed(2)} km)</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View> */}
        </View>
      </ScrollView>
    </View>
  );
}

export default Cine;

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

  mapContainer: {
    width: '100%',
    height: 240,
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 6,
  },
  map: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  sessionItem: {
    maxWidth: '100%',
    flexDirection: 'row',
    gap: 6,
  },
  sessionDetails: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  sessionDetailText: {
    color: '#000',
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'left',
    fontFamily: 'Roboto-Medium'
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

  sessionList: {
    gap: 6,
  },
  sessionItem: {
    maxWidth: '100%',
    flexDirection: 'row',
    gap: 6
  },
  sessionDetails: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  sessionDetailText: {
    color: '#000',
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'left',
    fontFamily: 'Roboto-Medium'
  }
});