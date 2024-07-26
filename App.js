import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Tabbarbottom from './UI/tabbarbottom';
import Router from './UI/router';
import LoginUI from './UI/loginUI';

const App = () => {
  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
    // <LoginUI></LoginUI>
  );
};

export default App;
