import React from 'react';
import {StyleSheet, Text, useColorScheme, View} from 'react-native';

const ScreenHeader = () => {
  const colorScheme = useColorScheme();
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.title,
          {
            color: colorScheme === 'dark' ? '#ebdbb2' : '#000',
          },
        ]}>
        Wordle
      </Text>
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
    fontWeight: '400',
    fontSize: 36,
  },
});

export default ScreenHeader;
