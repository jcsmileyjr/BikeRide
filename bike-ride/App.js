import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './screens/home/Home.js';

export default function App() {
  return (
    <View>
      <Home />
    </View>
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
