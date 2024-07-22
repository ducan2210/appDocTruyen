import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  danhSachMangaDeXuat,
  danhSachMangaMoi,
  danhSachMangaMoiCapNhat,
  danhSachMangaTopTrenđding,
} from '../CallAPI/mangaAPI';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

export default function HomeUI() {
  const navigation = useNavigation();
  const [searchValue, setSearchValue] = useState('');
  const [listTopTrend, setListTopTrend] = useState([]);
  const [listRecommend, setListRecommend] = useState([]);
  const [listNew, setListNew] = useState([]);
  const [listRecentUpdate, setListRecentUpdate] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const topTrenddingdata = async () => {
      setIsLoading(true); // Bắt đầu hiển thị hiệu ứng tải
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
        setIsLoading(false); // Tắt hiệu ứng tải khi đã tải xong
      }
    };
    topTrenddingdata();
  }, []);

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'Recommend', title: 'Recommend Comics' },
    { key: 'New', title: 'New Comics' },
    { key: 'RecentUpdate', title: 'Recent Update Comics' },
  ]);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      style={{ backgroundColor: 'white', borderRadius: 30, justifyContent: 'space-between' }}
      indicatorStyle={{ backgroundColor: '#61BFAD', height: 3, borderRadius: 2 }} // Màu đỏ cho tab đang chọn
      labelStyle={{ color: 'white', fontSize: 16 }}
      activeColor="#61BFAD" // Màu chữ và màu đường gạch chân dưới cho tab đang chọn
      inactiveColor="black" // Màu chữ cho tab không được chọn
    />
  );

  const handleComicPress = (comic) => {
    console.log('Pressed comic:', comic.id);
    navigation.navigate('ReviewMangaUI', { id: comic.id });
  };

  const Recommend = () => (
    <View>
      {isLoading ? ( // Hiển thị hiệu ứng tải nếu đang tải dữ liệu
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
          <ActivityIndicator size="large" color="#0db5ff" />
          <Text style={{ marginTop: 10 }}>Loading...</Text>
        </View>
      ) : (
        <ScrollView showsHorizontalScrollIndicator={false} style={{}}>
          {listRecommend.length > 0 ? (
            listRecommend.map((comic) => (
              <View key={comic.id} style={styles.comicContainer}>
                <TouchableOpacity
                  onPress={() => handleComicPress(comic)}
                  style={{ ...styles.comicTouchable, flexDirection: 'row' }}
                >
                  <Image source={{ uri: comic.thumbnail }} style={styles.comicImage} />
                  <View style={styles.comicTextContainer}>
                    <Text style={{ fontWeight: 'medium', fontSize: 14, marginBottom: 5 }}> {comic.id}</Text>
                    <Text style={{ fontWeight: 'regular', fontSize: 12, marginBottom: 5 }}>
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
                      <Text style={{ fontWeight: 'regular', fontSize: 12, color: '#FF6905' }}>
                        {' '}
                        {comic.lastest_chapter.name}
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
  );

  const New = () => (
    <View>
      {isLoading ? ( // Hiển thị hiệu ứng tải nếu đang tải dữ liệu
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
          <ActivityIndicator size="large" color="#0db5ff" />
          <Text style={{ marginTop: 10 }}>Loading...</Text>
        </View>
      ) : (
        <ScrollView showsHorizontalScrollIndicator={false} style={{}}>
          {listNew.length > 0 ? (
            listNew.map((comic) => (
              <View key={comic.id} style={styles.comicContainer}>
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
            <Text style={{ textAlign: 'center', marginTop: 20 }}>No trending manga found.</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
  const RecentUpdate = () => (
    <View>
      {isLoading ? ( // Hiển thị hiệu ứng tải nếu đang tải dữ liệu
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
          <ActivityIndicator size="large" color="#0db5ff" />
          <Text style={{ marginTop: 10 }}>Loading...</Text>
        </View>
      ) : (
        <ScrollView showsHorizontalScrollIndicator={false} style={{}}>
          {listRecentUpdate.length > 0 ? (
            listRecentUpdate.map((comic) => (
              <View key={comic.id} style={styles.comicContainer}>
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
            <Text style={{ textAlign: 'center', marginTop: 20 }}>No trending manga found.</Text>
          )}
        </ScrollView>
      )}
    </View>
  );

  const renderScene = SceneMap({
    Recommend: Recommend,
    New: New,
    RecentUpdate: RecentUpdate,
  });

  return (
    <View style={styles.container}>
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
      <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginTop: 26 }}>
        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Trending Manga</Text>
        <Entypo name="dots-three-horizontal" size={24} color="#858597" />
      </View>
      <View>
        {isLoading ? ( // Hiển thị hiệu ứng tải nếu đang tải dữ liệu
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
            <ActivityIndicator size="large" color="#0db5ff" />
            <Text style={{ marginTop: 10 }}>Loading...</Text>
          </View>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row', marginTop: 16 }}>
            {listTopTrend.length > 0 ? (
              listTopTrend.map((comic) => (
                <TouchableOpacity onPress={() => handleComicPress(comic)} key={comic.id} style={{ marginRight: 16 }}>
                  <Image source={{ uri: comic.thumbnail }} style={{ width: 140, height: 180, borderRadius: 8 }} />
                  <View style={{ marginTop: 10, maxWidth: 140 }}>
                    <Text
                      style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'center' }}
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
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
        style={{ marginTop: 31 }}
      />
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

  comicContainer: {
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

  comicTouchable: {
    borderRadius: 8,
    overflow: 'hidden', // Ensure the border radius is respected for the shadow
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
  comicTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
