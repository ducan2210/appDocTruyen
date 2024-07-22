import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Tabbarbottom from './UI/tabbarbottom';
import Router from './UI/router';

const App = () => {
  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  );
};

export default App;
