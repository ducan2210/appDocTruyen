import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeUI from './homeUI';
import ReviewMangaUI from './reviewMangaUI';
import ContainerRouter from './containerRouter';
import ReadManga from './readManga';
import ComicByGenreUI from './comicByGenreUI';
import WelcomeUI from './welcomeUI';
import LoginUI from './loginUI';

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="WelcomeUI">
      <Stack.Screen name="WelcomeUI" component={WelcomeUI} options={{ headerShown: false }} />
      <Stack.Screen name="ContainerRouter" component={ContainerRouter} options={{ title: '', headerShown: false }} />
      <Stack.Screen name="HomeUI" component={HomeUI} options={{ title: '', headerShown: false }} />
      <Stack.Screen name="ReviewMangaUI" component={ReviewMangaUI} options={{ title: '', headerShown: true }} />
      <Stack.Screen name="ReadManga" component={ReadManga} options={{ title: 'Read', headerShown: false }} />
      <Stack.Screen name="LoginUI" component={LoginUI} options={{ title: 'LoginUI', headerShown: false }} />
      <Stack.Screen
        name="ComicByGenreUI"
        component={ComicByGenreUI}
        options={{ title: 'Comics by genre', headerShown: true }}
      />
    </Stack.Navigator>
  );
};

export default Router;
