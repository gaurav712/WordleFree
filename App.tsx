import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import GameScreen from './app/GameScreen';

export default function App() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    RNBootSplash.hide({fade: true});
  }, []);

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: colorScheme === 'dark' ? '#282828' : '#eeeeee',
        },
      ]}>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colorScheme === 'dark' ? '#282828' : '#eeeeee'}
      />
      <GameScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
