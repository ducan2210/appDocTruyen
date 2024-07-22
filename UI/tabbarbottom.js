import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeUI from './homeUI'; // Import các screen bạn muốn hiển thị trong các tab
import MangaUI from './mangaUI';
import SearchUI from './searchUI';
import UserUI from './userUI';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function Tabbarbottom() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconColor = focused ? '#61bfad' : '#f4f3fd';

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Manga') {
            iconName = 'book';
          } else if (route.name === 'Search') {
            iconName = 'search';
          } else if (route.name === 'User') {
            iconName = 'user';
          }

          // You can return any component that you like here!
          return <FontAwesome name={iconName} size={24} color={iconColor} />;
        },

        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeUI} />
      <Tab.Screen name="Manga" component={MangaUI} />
      <Tab.Screen name="Search" component={SearchUI} />
      <Tab.Screen name="User" component={UserUI} />
    </Tab.Navigator>
  );
}
