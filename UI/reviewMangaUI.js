import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { reviewManga, loadCmt } from '../CallAPI/mangaAPI';
import { Feather, FontAwesome5, EvilIcons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ReviewMangaUI({ route }) {
  const navigation = useNavigation();
  const { id } = route.params;
  const [ifComic, setIfcomic] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showAllChapters, setShowAllChapters] = useState(false);
  const [sort, setSort] = useState(false);
  const [cmts, setCmts] = useState([]);
  const [showAllCmt, setShowAllCCmt] = useState(false);

  useEffect(() => {
    const loadInfComic = async () => {
      try {
        const comic = await reviewManga(id);
        setIfcomic(comic);
        setLoading(false);
      } catch (error) {
        console.error('Error', error);
        setLoading(false);
      }
    };
    const loadCmts = async () => {
      try {
        const comicCmt = await loadCmt(id);
        setCmts(comicCmt.comments || []);
        setLoading(false);
      } catch (error) {
        console.error('Error', error);
        setCmts([]);
        setLoading(false);
      }
    };

    loadInfComic();
    loadCmts();
  }, []);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const toggleSort = () => {
    setSort(!sort);
  };

  const toggleShowAllChapters = () => {
    setShowAllChapters(!showAllChapters);
  };

  const toggleShowAllCmt = () => {
    setShowAllCCmt(!showAllCmt);
  };

  const toggleGenre = (idGenre, nameGenre) => {
    navigation.navigate('ComicByGenreUI', { id: idGenre, name: nameGenre });
  };

  const toggleReadNow = (idComic, chapter) => {
    navigation.navigate('ReadManga', { id: idComic, chap: chapter });
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#61bfad" />
      </View>
    );
  }

  if (!ifComic) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error loading comic details.</Text>
      </View>
    );
  }

  const sortedChapters = sort
    ? [...ifComic.chapters].sort((a, b) => {
        const getChapterNumber = (chapterName) => {
          const match = chapterName.match(/\d+/);
          return match ? parseInt(match[0], 10) : 0;
        };

        const chapterANumber = getChapterNumber(a.name);
        const chapterBNumber = getChapterNumber(b.name);

        return chapterANumber - chapterBNumber;
      })
    : [...ifComic.chapters].sort((a, b) => {
        const getChapterNumber = (chapterName) => {
          const match = chapterName.match(/\d+/);
          return match ? parseInt(match[0], 10) : 0;
        };

        const chapterANumber = getChapterNumber(a.name);
        const chapterBNumber = getChapterNumber(b.name);

        return chapterBNumber - chapterANumber;
      });

  return (
    <ImageBackground source={{ uri: ifComic.thumbnail }} style={styles.backgroundImage} blurRadius={10}>
      <View style={styles.overlay} />
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image source={{ uri: ifComic.thumbnail }} style={styles.comicImage} resizeMode="cover" />
        </View>
        <View style={styles.body}>
          <Text style={styles.title}>{ifComic.title}</Text>
          <Text style={styles.info}>
            {ifComic.chapters.length > 0 && `${ifComic.chapters[0].id} Chapter - `}
            {`${ifComic.total_views} Views - ${ifComic.followers} Followers`}
          </Text>
          <Text style={styles.status}>{ifComic.status}</Text>
          {showFullDescription ? (
            <Text style={styles.description}>{ifComic.description}</Text>
          ) : (
            <Text numberOfLines={4} ellipsizeMode="tail" style={styles.description}>
              {ifComic.description}
            </Text>
          )}
          {!showFullDescription && (
            <TouchableOpacity onPress={toggleDescription} style={styles.moreButton}>
              <Text style={styles.moreText}>...more</Text>
            </TouchableOpacity>
          )}
          <View style={{ marginTop: 2, flexDirection: 'row', flexWrap: 'wrap' }}>
            {ifComic.genres.map((genre, index) => (
              <TouchableOpacity
                onPress={() => toggleGenre(genre.id, genre.name)}
                key={`${genre.id}-${genre.name}-${index}`}
                style={{
                  marginTop: 5,
                  borderRadius: 8,
                  padding: 5,
                  borderWidth: 1,
                  borderColor: '#858597',
                  marginRight: 5,
                }}
              >
                <Text style={{ color: '#858597' }}>{genre.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderBottomWidth: 1,
              borderBottomColor: '#858597',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Feather name="list" size={24} color="white" />
              <Text style={{ color: 'white' }}>Chapters</Text>
            </View>
            <TouchableOpacity onPress={toggleSort}>
              {sort ? (
                <FontAwesome5 name="sort-amount-down-alt" size={20} color="white" />
              ) : (
                <FontAwesome5 name="sort-amount-up-alt" size={20} color="white" />
              )}
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 12 }}>
            <Text style={{ color: 'white' }}>Chapter</Text>
            <Text style={{ color: 'white' }}>Update at</Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderRadius: 10,
              borderColor: '#858597',
              marginTop: 10,
              paddingHorizontal: 5,
              paddingTop: 5,
            }}
          >
            {!showAllChapters
              ? sortedChapters.slice(0, 7).map((chapter, index) => (
                  <TouchableOpacity
                    onPress={() => toggleReadNow(id, chapter.id)}
                    key={`${chapter.id}-${chapter.name}-${index}`}
                    style={{ marginTop: 5, flexDirection: 'row', justifyContent: 'space-between' }}
                  >
                    <Text style={{ color: 'white' }}>{chapter.name}</Text>
                    <Text style={{ color: 'white' }}>{chapter.updated_at}</Text>
                  </TouchableOpacity>
                ))
              : sortedChapters.map((chapter, index) => (
                  <TouchableOpacity
                    key={`${chapter.id}-${chapter.name}-${index}`}
                    style={{ marginTop: 5, flexDirection: 'row', justifyContent: 'space-between' }}
                  >
                    <Text style={{ color: 'white' }}>{chapter.name}</Text>
                    <Text style={{ color: 'white' }}>{chapter.updated_at}</Text>
                  </TouchableOpacity>
                ))}
            {!showAllChapters ? (
              <TouchableOpacity
                onPress={toggleShowAllChapters}
                style={{
                  height: 50,
                  borderWidth: 1,
                  borderColor: '#858597',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginVertical: 10,
                }}
              >
                <Text style={{ color: '#C20000', fontWeight: 'bold', fontSize: 20 }}>+More</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={toggleShowAllChapters}
                style={{
                  height: 50,
                  borderWidth: 1,
                  borderColor: '#858597',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginVertical: 10,
                }}
              >
                <Text style={{ color: '#C20000', fontWeight: 'bold', fontSize: 20 }}>-Less</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
            <TouchableOpacity
              onPress={() => toggleReadNow(id, 1)}
              style={{
                borderRadius: 80,
                backgroundColor: '#C20000',
                justifyContent: 'center',
                alignItems: 'center',
                width: 300,
                height: 50,
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Read now</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            marginTop: 10,
            paddingBottom: 15,
            marginBottom: 50,
            marginHorizontal: 20,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: '#858597',
          }}
        >
          <TouchableOpacity
            onPress={toggleShowAllCmt}
            style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 5 }}
          >
            <Text style={{ color: '#858597' }}>{cmts.length} comments total</Text>
            <AntDesign name="right" size={12} color="#858597" />
          </TouchableOpacity>
          {showAllCmt
            ? cmts.length > 0 &&
              cmts.map((cmt, index) => (
                <View key={`${cmt.username}-${cmt.created_at}-${index}`} style={{ marginTop: 15 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <EvilIcons name="user" size={50} color="#858597" />
                    <View style={{ flexDirection: 'column', marginLeft: 3 }}>
                      <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{cmt.username}</Text>
                      <Text style={{ marginTop: 5 }}>{cmt.content}</Text>
                      <Text style={{ marginTop: 5, fontSize: 12, color: '#858597' }}>{cmt.created_at}</Text>
                    </View>
                  </View>
                </View>
              ))
            : cmts.length > 0 &&
              cmts.slice(0, 3).map((cmt, index) => (
                <View key={`${cmt.username}-${cmt.created_at}-${index}`} style={{ marginTop: 15 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <EvilIcons name="user" size={50} color="#858597" />
                    <View style={{ flexDirection: 'column', marginLeft: 3 }}>
                      <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{cmt.username}</Text>
                      <Text style={{ marginTop: 5 }}>{cmt.content}</Text>
                      <Text style={{ marginTop: 5, fontSize: 12, color: '#858597' }}>{cmt.created_at}</Text>
                    </View>
                  </View>
                </View>
              ))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
  },
  comicImage: {
    width: 200,
    height: 298,
  },
  body: {
    paddingHorizontal: 20,
    marginTop: 15,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    marginTop: 10,
  },
  info: {
    fontWeight: 'normal',
    fontSize: 12,
    color: 'white',
    marginTop: 4,
  },
  status: {
    color: '#C20000',
    fontWeight: 'bold',
    fontSize: 17,
    marginTop: 5,
  },
  description: {
    fontWeight: 'normal',
    fontSize: 15,
    color: 'white',
    marginTop: 10,
  },
  moreButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  moreText: {
    color: '#C20000',
    fontWeight: 'regular',
  },
});
