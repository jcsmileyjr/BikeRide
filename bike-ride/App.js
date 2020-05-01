import React from 'react';
import { Root } from "native-base";
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './screens/Home.js';
import ForecastScreen from './screens/Forecast.js';
import SetCriteriaScreen from './screens/SetCriteria.js';

export default function App() {
  return (
    <Root>{/*Needed to display Toasts */}
      <AppContainer />
    </Root>
  
  );
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

const AppNavigator = createStackNavigator({ Home: HomeScreen, Forecast:ForecastScreen, SetCriteria:SetCriteriaScreen}, navigationOptions);
const AppContainer = createAppContainer(AppNavigator);
