import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { loadChapter } from '../CallAPI/mangaAPI';
import { AntDesign } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
export default function ReadManga({ route }) {
  const { id, chap } = route.params;

  const [chapterImages, setChapterImages] = useState([]);
  const [currentChap, setCurrentChap] = useState(chap);
  const [isLoading, setIsLoading] = useState(false);
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    const loadChap = async () => {
      setIsLoading(true); // Bắt đầu hiển thị hiệu ứng tải
      try {
        const chapters = await loadChapter(id, currentChap);
        if (Array.isArray(chapters.images)) {
          setChapterImages(chapters.images);
        } else {
          setChapterImages([]);
        }
        if (Array.isArray(chapters.chapters)) {
          setChapters(chapters.chapters);
        } else {
          setChapters([]);
        }
      } catch (error) {
        console.error('Error', error);
        setChapters([]);
        setChapterImages([]);
      } finally {
        setIsLoading(false); // Tắt hiệu ứng tải khi đã tải xong
      }
    };
    loadChap();
  }, [id, currentChap]);

  const togglePreviusChapter = () => {
    const chapNumber = parseInt(currentChap, 10);
    if (chapNumber > 1) {
      setCurrentChap(chapNumber - 1);
    }
  };

  const toggleNextChapter = () => {
    const chapNumber = parseInt(currentChap, 10);
    if (chapters[0].id > chapNumber) {
      setCurrentChap(chapNumber + 1);
    }
  };

  const { width } = Dimensions.get('window');
  const imageHeight = width * 1.5; // Assuming the aspect ratio of the image is 3:2 (height = width * 1.5)
  const onChapterChange = (itemValue) => {
    setCurrentChap(itemValue);
  };
  return (
    <ScrollView style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 5 }}>
        <TouchableOpacity onPress={togglePreviusChapter}>
          <AntDesign name="caretleft" size={24} color="#0db5ff" />
        </TouchableOpacity>
        <RNPickerSelect
          onValueChange={(value) => setCurrentChap(value)}
          items={chapters.map((chap) => ({ label: `${chap.name}`, value: chap.id }))}
          style={{
            inputIOS: styles.inputIOS,
            inputAndroid: styles.inputAndroid,
          }}
          value={currentChap}
          useNativeAndroidPickerStyle={false}
          placeholder={{}}
        />

        <TouchableOpacity onPress={toggleNextChapter}>
          <AntDesign name="caretright" size={24} color="#0db5ff" />
        </TouchableOpacity>
      </View>
      {isLoading ? ( // Hiển thị hiệu ứng tải nếu đang tải dữ liệu
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
          <ActivityIndicator size="large" color="#0db5ff" />
          <Text style={{ marginTop: 10 }}>Loading...</Text>
        </View>
      ) : chapterImages && chapterImages.length > 0 ? (
        chapterImages.map((chapItem) => (
          <Image
            key={chapItem.page}
            source={{ uri: 'https://comics-api.vercel.app/' + chapItem.src }}
            style={{ height: imageHeight, width: '100%', resizeMode: 'contain' }}
          />
        ))
      ) : (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>No images found for this chapter.</Text>
      )}
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 5 }}>
        <TouchableOpacity onPress={togglePreviusChapter}>
          <AntDesign name="caretleft" size={24} color="#0db5ff" />
        </TouchableOpacity>

        <RNPickerSelect
          onValueChange={(value) => setCurrentChap(value)}
          items={chapters.map((chap) => ({ label: `${chap.name}`, value: chap.id }))}
          style={{
            inputIOS: styles.inputIOS,
            inputAndroid: styles.inputAndroid,
          }}
          value={currentChap}
          useNativeAndroidPickerStyle={false}
          placeholder={{}}
        />

        <TouchableOpacity onPress={toggleNextChapter}>
          <AntDesign name="caretright" size={24} color="#0db5ff" />
        </TouchableOpacity>
      </View>
      <View style={{ height: 30 }}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 48,
    flex: 1,
  },
  inputIOS: {
    backgroundColor: '#0db5ff',
    borderRadius: 12,
    height: 48,
    paddingHorizontal: 10,
    marginTop: 5,
    color: 'white', // Text color
    fontWeight: 'regular',
    fontSize: 19,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  inputAndroid: {
    backgroundColor: '#0db5ff',
    borderRadius: 12,
    height: 48,
    paddingHorizontal: 10,
    marginTop: 5,
    color: 'white', // Text color
    fontWeight: 'regular',
    fontSize: 19,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
});
