import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { loadGenres, loadComicByGenres } from '../CallAPI/mangaAPI';
import { useNavigation } from '@react-navigation/native';

export default function MangaUI() {
  const [genres, setGenres] = useState([]);
  const [tenDanhMuc, setTenDanhMuc] = useState('');
  const [comicsByGenre, setComicsByGenre] = useState([]);
  const [loading, setLoading] = useState(false); // State for loading
  const navigation = useNavigation();

  useEffect(() => {
    const loadGns = async () => {
      setLoading(true); // Start loading
      try {
        const listGenres = await loadGenres();
        setGenres(listGenres);
      } catch (error) {
        console.error('Error', error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    loadGns();
  }, []);

  useEffect(() => {
    const loadComicsByGn = async (tenDanhMuc) => {
      if (!tenDanhMuc) return;

      setLoading(true); // Start loading
      try {
        const listComicsByGenre = await loadComicByGenres(tenDanhMuc);
        setComicsByGenre(listComicsByGenre.comics);
      } catch (error) {
        console.error('Error', error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    loadComicsByGn(tenDanhMuc);
  }, [tenDanhMuc]);

  const handleComicPress = (comic) => {
    console.log('Pressed comic:', comic.id);
    navigation.navigate('ReviewMangaUI', { id: comic.id });
  };

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 15, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={require('../images/Layer.png')}
          style={{
            width: 58,
            height: 58,
            borderRadius: 100,
          }}
        />
        <Text style={{ fontWeight: 'bold', fontSize: 22, marginLeft: 21 }}>An Nguyen Duc</Text>
      </View>

      <RNPickerSelect
        onValueChange={(value) => {
          setTenDanhMuc(value);
        }}
        items={genres.map((genre) => ({ label: `${genre.name}`, value: genre.id }))}
        style={{
          inputIOS: styles.inputIOS,
          inputAndroid: styles.inputAndroid,
        }}
        value={tenDanhMuc}
        useNativeAndroidPickerStyle={false}
        placeholder={{}}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
      ) : (
        <ScrollView showsHorizontalScrollIndicator={false} style={{ marginTop: 25 }}>
          {comicsByGenre.length > 0 ? (
            comicsByGenre.map((comic, index) => (
              <View key={`${comic.id}-${index}`} style={styles.comicContainer}>
                <TouchableOpacity
                  onPress={() => handleComicPress(comic)}
                  style={{ ...styles.comicTouchable, flexDirection: 'row' }}
                >
                  <Image source={{ uri: comic.thumbnail }} style={styles.comicImage} />
                  <View style={styles.comicTextContainer}>
                    <Text style={{ fontWeight: 'medium', fontSize: 14, marginBottom: 5 }}> {comic.title}</Text>
                    <Text style={{ fontWeight: 'regular', fontSize: 12, marginBottom: 5 }}>
                      {' '}
                      Update {comic.updated_at}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <View>
              <Text style={{ textAlign: 'center', marginTop: 20 }}>No trending manga found.</Text>
            </View>
          )}
          <View style={{ height: 150 }} />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 44,
    backgroundColor: '#fff',
  },
  inputIOS: {
    backgroundColor: '#F4F3FD',
    borderRadius: 12,
    height: 48,
    paddingHorizontal: 10,
    marginTop: 25,
    color: '#858597',
    fontWeight: 'regular',
    fontSize: 19,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  inputAndroid: {
    backgroundColor: '#F4F3FD',
    borderRadius: 12,
    height: 48,
    paddingHorizontal: 10,
    marginTop: 25,
    color: '#858597',
    fontWeight: 'regular',
    fontSize: 19,
    paddingHorizontal: 20,
    paddingVertical: 14,
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
