import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './screens/Home.js';
import ForecastScreen from './screens/Forecast.js';

export default function App() {
  return (<AppContainer />);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const navigationOptions = {
  headerMode: 'none'
}

const AppNavigator = createStackNavigator({ Home: HomeScreen, Forecast:ForecastScreen}, navigationOptions);
const AppContainer = createAppContainer(AppNavigator);
