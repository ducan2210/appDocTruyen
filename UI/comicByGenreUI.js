import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, ActivityIndicator, ScrollView, TouchableOpacity, Image } from 'react-native';
import { loadComicByGenres, loadGenres } from '../CallAPI/mangaAPI';
import { useNavigation } from '@react-navigation/native';

export default function ComicByGenreUI({ route }) {
  const { id, name } = route.params;
  const [listComicsByGenre, setListComicsByGenre] = useState([]);
  const [description, setDescription] = useState([]);
  const [loading, setLoading] = useState(false); // State for loading
  const navigation = useNavigation();
  useEffect(() => {
    console.log(id);
    const loadComicsByGn = async () => {
      try {
        const comics = await loadComicByGenres(id);
        setListComicsByGenre(comics.comics);
      } catch (error) {
        console.error('Error', error);
      }
    };
    loadComicsByGn(id);
    const loadGn = async () => {
      setLoading(true);
      try {
        const genres = await loadGenres();
        genres.map((genre) => {
          if (genre.id == id) {
            setDescription(genre.description);
            setLoading(false);
          }
        });
      } catch (error) {
        console.error('Error', error);
      }
    };
    loadGn();
    console.log(description);
  }, [id]);

  const handleComicPress = (comic) => {
    console.log('Pressed comic:', comic.id);
    navigation.navigate('ReviewMangaUI', { id: comic.id });
  };

  return (
    <View style={styles.container}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 30, color: '#61BFAD' }}>{name}</Text>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontStyle: 'italic', fontSize: 15, color: '#858597' }}>({description})</Text>
      </View>
      <View>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
        ) : (
          <ScrollView showsHorizontalScrollIndicator={false} style={{ marginTop: 25 }}>
            {listComicsByGenre.length > 0 ? (
              listComicsByGenre.map((comic, index) => (
                <View key={`${comic.id}-${index}`} style={styles.comicContainer}>
                  <TouchableOpacity
                    onPress={() => handleComicPress(comic)}
                    style={{ ...styles.comicTouchable, flexDirection: 'row' }}
                  >
                    <Image source={{ uri: comic.thumbnail }} style={styles.comicImage} />
                    <View style={styles.comicTextContainer}>
                      <Text style={{ fontWeight: 'medium', fontSize: 14, marginBottom: 5 }}>{comic.title}</Text>
                      <Text style={{ fontWeight: 'regular', fontSize: 12, marginBottom: 5 }}>
                        Update {comic.lastest_chapters[0].updated_at}
                      </Text>
                      <View
                        style={{
                          backgroundColor: '#FFEBF0',
                          borderWidth: 1,
                          borderColor: '#ddd',
                          maxWidth: 100,
                          borderRadius: 13,
                          MaxHeight: 15,
                          alignItems: 'center',
                        }}
                      >
                        <Text style={{ fontWeight: 'regular', fontSize: 12, color: '#FF6905' }}>
                          {' '}
                          {comic.lastest_chapters && comic.lastest_chapters.length > 0
                            ? comic.lastest_chapters[0].name
                            : 'No chapters available'}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
            )}
          </ScrollView>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 5,

    backgroundColor: '#fff',
  },
  comicContainer: {
    shadowColor: '#7090B0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginTop: 16,
  },
  comicTouchable: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  comicImage: {
    width: 68,
    height: 68,
    borderRadius: 8,
  },
  comicTextContainer: {
    marginLeft: 35,
    justifyContent: 'center',
  },
});
