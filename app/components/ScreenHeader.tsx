import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ScreenHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wordle</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#df928e',
    fontWeight: '400',
    fontSize: 36,
  },
});

export default ScreenHeader;
