import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';
import {
  searchComics,
  danhSachMangaDeXuat,
  danhSachMangaMoi,
  danhSachMangaMoiCapNhat,
  danhSachMangaTopTrenđding,
  loadTopComics,
} from '../CallAPI/mangaAPI';
import { useNavigation } from '@react-navigation/native';

export default function SearchUI() {
  const [searchValue, setSearchValue] = useState('');
  const [topQueryValue, setTopQueryValue] = useState('');
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(false); // State for loading
  const [listTopTrend, setListTopTrend] = useState([]);
  const [listRecommend, setListRecommend] = useState([]);
  const [listNew, setListNew] = useState([]);
  const [listRecentUpdate, setListRecentUpdate] = useState([]);
  const [listTop, setlistTop] = useState([]);
  const navigation = useNavigation();
  const [loadingTopComics, setLoadingTopComics] = useState(false); // State for loading
  useEffect(() => {
    const loadSearch = async () => {
      setLoading(true); // Bắt đầu hiển thị hiệu ứng tải
      try {
        const listComic = await searchComics(searchValue);
        setComics(listComic.comics);
      } catch (error) {
        console.error('Error', error);
        setComics([]);
      } finally {
        setLoading(false); // Tắt hiệu ứng tải khi đã tải xong
      }
    };

    if (searchValue) {
      loadSearch();
    }

    const topTrenddingdata = async () => {
      setLoading(true); // Bắt đầu hiển thị hiệu ứng tải
      try {
        const page = 1;
        const status = 'all';
        const mangaTrend = await danhSachMangaTopTrenđding(page);
        const mangaRecommend = await danhSachMangaDeXuat();
        const mangaNew = await danhSachMangaMoi(page, status);
        const mangaRecentUpdate = await danhSachMangaMoiCapNhat(page, status);
        setListTopTrend(mangaTrend.comics);
        setListRecentUpdate(mangaRecentUpdate.comics);
        setListNew(mangaNew.comics);
        setListRecommend(mangaRecommend);
      } catch (error) {
        console.error('Error', error);
      } finally {
        setLoading(false); // Tắt hiệu ứng tải khi đã tải xong
      }
    };
    topTrenddingdata();
  }, [searchValue]);

  useEffect(() => {
    const topQueryComics = async (topQueryValue) => {
      setLoadingTopComics(true); // Bắt đầu hiển thị hiệu ứng tải
      try {
        const status = topQueryValue;
        const topComicsList = await loadTopComics(status);
        setlistTop(topComicsList.comics);
      } catch (error) {
        console.error('Error', error);
      } finally {
        setLoadingTopComics(false); // Tắt hiệu ứng tải khi đã tải xong
      }
    };
    topQueryComics(topQueryValue);
  }, [topQueryValue]);

  const handleComicPress = (comic) => {
    console.log('Pressed comic:', comic.id);
    navigation.navigate('ReviewMangaUI', { id: comic.id });
  };
  const [selectedGenre, setSelectedGenre] = useState('1');

  const handleTopComicsGenre = (genre) => {
    switch (genre) {
      case '1':
        setTopQueryValue('');
        setSelectedGenre(genre);
        break;
      case '2':
        setTopQueryValue('daily');
        setSelectedGenre(genre);
        break;
      case '3':
        setTopQueryValue('weekly');
        setSelectedGenre(genre);
        break;
      case '4':
        setTopQueryValue('monthly');
        setSelectedGenre(genre);
        break;
      case '5':
        setTopQueryValue('follow');
        setSelectedGenre(genre);
        break;
      default:
        setTopQueryValue('');
        break;
    }
  };

  return (
    <View style={styles.container}>
      {searchValue.length > 0 ? (
        <>
          <View style={{ marginTop: 15, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={require('../images/Avatar.png')}
              style={{ width: 58, height: 58, backgroundColor: 'red', borderRadius: 100 }}
            />
            <Text style={{ fontWeight: 'bold', fontSize: 22, marginLeft: 21 }}>An Nguyen Duc</Text>
          </View>
          <SearchBar
            placeholder="Search"
            onChangeText={(text) => {
              setSearchValue(text); // Cập nhật giá trị searchValue
              console.log(text); // Log text ra console để kiểm tra
            }}
            value={searchValue} // Đặt giá trị của SearchBar bằng searchValue
            containerStyle={{
              backgroundColor: '#F4F3FD',
              borderRadius: 12,
              borderTopWidth: 0,
              borderBottomWidth: 0,
              marginTop: 25,
              height: 48,
            }}
            inputContainerStyle={{ backgroundColor: '#F4F3FD', height: 20 }}
          />
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
          ) : (
            <ScrollView showsHorizontalScrollIndicator={false} style={{ marginTop: 25 }}>
              {comics.map((comic, index) => (
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
              ))}
              <View style={{ height: 150 }} />
            </ScrollView>
          )}
        </>
      ) : (
        <View>
          <View style={{ marginTop: 15, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={require('../images/Avatar.png')}
              style={{ width: 58, height: 58, backgroundColor: 'red', borderRadius: 100 }}
            />
            <Text style={{ fontWeight: 'bold', fontSize: 22, marginLeft: 21 }}>An Nguyen Duc</Text>
          </View>
          <SearchBar
            placeholder="Search"
            onChangeText={(text) => {
              setSearchValue(text); // Cập nhật giá trị searchValue
              console.log(text); // Log text ra console để kiểm tra
            }}
            value={searchValue} // Đặt giá trị của SearchBar bằng searchValue
            containerStyle={{
              backgroundColor: '#F4F3FD',
              borderRadius: 12,
              borderTopWidth: 0,
              borderBottomWidth: 0,
              marginTop: 25,
              marginBottom: 5,
              height: 48,
            }}
            inputContainerStyle={{ backgroundColor: '#F4F3FD', height: 20 }}
          />
          <ScrollView>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 26,
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Trending Manga</Text>
              <Entypo name="dots-three-horizontal" size={24} color="#858597" />
            </View>
            <View>
              {loading ? ( // Hiển thị hiệu ứng tải nếu đang tải dữ liệu
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                  <ActivityIndicator size="large" color="#0db5ff" />
                  <Text style={{ marginTop: 10 }}>Loading...</Text>
                </View>
              ) : (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{ flexDirection: 'row', marginTop: 16 }}
                >
                  {listTopTrend.length > 0 ? (
                    listTopTrend.map((comic) => (
                      <TouchableOpacity
                        onPress={() => handleComicPress(comic)}
                        key={comic.id}
                        style={{ marginRight: 16 }}
                      >
                        <Image source={{ uri: comic.thumbnail }} style={{ width: 140, height: 180, borderRadius: 8 }} />
                        <View style={{ marginTop: 10, maxWidth: 140 }}>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: 'bold',
                              textAlign: 'center',
                            }}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                          >
                            {comic.title}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))
                  ) : (
                    <Text style={{ textAlign: 'center', marginTop: 20 }}>No trending manga found.</Text>
                  )}
                </ScrollView>
              )}
            </View>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 26,
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Recommend comics</Text>
              <Entypo name="dots-three-horizontal" size={24} color="#858597" />
            </View>
            <View>
              {loading ? ( // Hiển thị hiệu ứng tải nếu đang tải dữ liệu
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                  <ActivityIndicator size="large" color="#0db5ff" />
                  <Text style={{ marginTop: 10 }}>Loading...</Text>
                </View>
              ) : (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{ flexDirection: 'row', marginTop: 16 }}
                >
                  {listRecommend.length > 0 ? (
                    listRecommend.map((comic) => (
                      <TouchableOpacity
                        onPress={() => handleComicPress(comic)}
                        key={comic.id}
                        style={{ marginRight: 16 }}
                      >
                        <Image source={{ uri: comic.thumbnail }} style={{ width: 140, height: 180, borderRadius: 8 }} />
                        <View style={{ marginTop: 10, maxWidth: 140 }}>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: 'bold',
                              textAlign: 'center',
                            }}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                          >
                            {comic.id}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))
                  ) : (
                    <Text style={{ textAlign: 'center', marginTop: 20 }}>No trending manga found.</Text>
                  )}
                </ScrollView>
              )}
            </View>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 26,
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>New comics</Text>
              <Entypo name="dots-three-horizontal" size={24} color="#858597" />
            </View>
            <View>
              {loading ? ( // Hiển thị hiệu ứng tải nếu đang tải dữ liệu
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                  <ActivityIndicator size="large" color="#0db5ff" />
                  <Text style={{ marginTop: 10 }}>Loading...</Text>
                </View>
              ) : (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{ flexDirection: 'row', marginTop: 16 }}
                >
                  {listNew.length > 0 ? (
                    listNew.map((comic) => (
                      <TouchableOpacity
                        onPress={() => handleComicPress(comic)}
                        key={comic.id}
                        style={{ marginRight: 16 }}
                      >
                        <Image source={{ uri: comic.thumbnail }} style={{ width: 140, height: 180, borderRadius: 8 }} />
                        <View style={{ marginTop: 10, maxWidth: 140 }}>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: 'bold',
                              textAlign: 'center',
                            }}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                          >
                            {comic.title}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))
                  ) : (
                    <Text style={{ textAlign: 'center', marginTop: 20 }}>No trending manga found.</Text>
                  )}
                </ScrollView>
              )}
            </View>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 26,
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Recent update comics</Text>
              <Entypo name="dots-three-horizontal" size={24} color="#858597" />
            </View>
            <View>
              {loading ? ( // Hiển thị hiệu ứng tải nếu đang tải dữ liệu
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                  <ActivityIndicator size="large" color="#0db5ff" />
                  <Text style={{ marginTop: 10 }}>Loading...</Text>
                </View>
              ) : (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{ flexDirection: 'row', marginTop: 16 }}
                >
                  {listRecentUpdate.length > 0 ? (
                    listRecentUpdate.map((comic) => (
                      <TouchableOpacity
                        onPress={() => handleComicPress(comic)}
                        key={comic.id}
                        style={{ marginRight: 16 }}
                      >
                        <Image source={{ uri: comic.thumbnail }} style={{ width: 140, height: 180, borderRadius: 8 }} />
                        <View style={{ marginTop: 10, maxWidth: 140 }}>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: 'bold',
                              textAlign: 'center',
                            }}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                          >
                            {comic.title}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))
                  ) : (
                    <Text style={{ textAlign: 'center', marginTop: 20 }}>No trending manga found.</Text>
                  )}
                </ScrollView>
              )}
            </View>

            <View style={styles.topComicContainer}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  borderColor: '#858597',
                }}
              >
                <Text style={{ marginBottom: 5, fontWeight: 'bold', fontSize: 25, color: '#61BFAD' }}>TOP COMIC</Text>
              </View>
              <View style={{ marginTop: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity onPress={() => handleTopComicsGenre('1')}>
                  <Text style={[styles.buttonText, selectedGenre === '1' && styles.selectedText]}>Top all</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleTopComicsGenre('2')}>
                  <Text style={[styles.buttonText, selectedGenre === '2' && styles.selectedText]}>Top daily</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleTopComicsGenre('3')}>
                  <Text style={[styles.buttonText, selectedGenre === '3' && styles.selectedText]}>Top weekly</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleTopComicsGenre('4')}>
                  <Text style={[styles.buttonText, selectedGenre === '4' && styles.selectedText]}>Top monthly</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleTopComicsGenre('5')}>
                  <Text style={[styles.buttonText, selectedGenre === '5' && styles.selectedText]}>Top follow</Text>
                </TouchableOpacity>
              </View>
              <View>
                {loadingTopComics ? ( // Hiển thị hiệu ứng tải nếu đang tải dữ liệu
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 30,
                    }}
                  >
                    <ActivityIndicator size="large" color="#0db5ff" />
                    <Text style={{ marginTop: 10 }}>Loading...</Text>
                  </View>
                ) : (
                  <ScrollView showsHorizontalScrollIndicator={false} style={{}}>
                    {listTop.length > 0 ? (
                      listTop.map((comic) => (
                        <View key={comic.id} style={styles.topComicContainer}>
                          <TouchableOpacity
                            onPress={() => handleComicPress(comic)}
                            style={{ ...styles.comicTouchable, flexDirection: 'row' }}
                          >
                            <Image source={{ uri: comic.thumbnail }} style={styles.comicImage} />
                            <View style={styles.comicTextContainer}>
                              <Text
                                style={{
                                  fontWeight: 'medium',
                                  fontSize: 14,
                                  marginBottom: 5,
                                }}
                              >
                                {' '}
                                {comic.title}
                              </Text>
                              <Text
                                style={{
                                  fontWeight: 'regular',
                                  fontSize: 12,
                                  marginBottom: 5,
                                }}
                              >
                                {' '}
                                Update {comic.updated_at}
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
                                <Text
                                  style={{
                                    fontWeight: 'regular',
                                    fontSize: 12,
                                    color: 'red',
                                  }}
                                >
                                  {' '}
                                  {comic.lastest_chapters[0].name}
                                </Text>
                              </View>
                            </View>
                          </TouchableOpacity>
                        </View>
                      ))
                    ) : (
                      <Text style={{ textAlign: 'center', marginTop: 20 }}>No trending manga found.</Text>
                    )}
                  </ScrollView>
                )}
              </View>
            </View>

            <View style={{ height: 150 }}></View>
          </ScrollView>
        </View>
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
  buttonText: {
    color: 'black',
  },
  selectedText: {
    color: '#61BFAD',
    fontWeight: 'bold',
  },
  topComicContainer: {
    shadowColor: '#7090B0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5, // This is for Android elevation
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderBottomWidth: 0, // Remove bottom border
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginTop: 16,
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
