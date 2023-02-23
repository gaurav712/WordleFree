import React from 'react';
import {SafeAreaView, StyleSheet, useColorScheme, View} from 'react-native';
import GameScreen from './app/GameScreen';

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colorScheme === 'dark' ? '#282828' : '#eeeeee',
        },
      ]}>
      <SafeAreaView style={styles.container}>
        <GameScreen />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
