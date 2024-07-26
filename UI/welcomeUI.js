import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeUI() {
  const navigation = useNavigation();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('LoginUI'); // Chuyển đến màn hình chính sau ... giây
    }, 3000);

    return () => clearTimeout(timer); // Xóa timer nếu component bị unmount
  }, [navigation]);

  return (
    <ImageBackground source={require('../images/backgroundWelcome.png')} style={styles.backgroundImage}>
      <Image source={require('../images/logo_195e0dbd-a0dc-42af-aa61-8f5999ce14cb 1.png')} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'cover',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
