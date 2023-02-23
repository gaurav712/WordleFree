import React from 'react';
import {StyleSheet, Text, useColorScheme, View} from 'react-native';

export enum TextBlockState {
  GUESS = 'guess',
  CORRECT = 'correct',
  POSSIBLE = 'possible',
  INCORRECT = 'incorrect',
}

const ColorMap: Record<TextBlockState, string> = {
  [TextBlockState.GUESS]: 'transparent',
  [TextBlockState.CORRECT]: '#76b041',
  [TextBlockState.POSSIBLE]: '#F6BE00',
  [TextBlockState.INCORRECT]: '#8b939c',
};

interface TextBlockProps {
  text: string;
  state: TextBlockState;
}

const TextBlock = (props: TextBlockProps) => {
  const {text, state} = props;
  const colorScheme = useColorScheme();

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: colorScheme === 'dark' ? '#eeeeee' : '#282828',
          backgroundColor: ColorMap[state],
        },
      ]}>
      <Text
        style={[
          styles.text,
          {
            color: colorScheme === 'dark' ? '#eeeeee' : '#000',
          },
        ]}>
        {text.toUpperCase()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TextBlock;
