import React from 'react';
import {StyleSheet, Text, useColorScheme} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export enum TextBlockState {
  GUESS = 'guess',
  CORRECT = 'correct',
  POSSIBLE = 'possible',
  INCORRECT = 'incorrect',
}

const ColorMap: Record<TextBlockState, string[]> = {
  [TextBlockState.GUESS]: ['transparent', '#cccccc'],
  [TextBlockState.CORRECT]: ['#30ff44', '#005000'],
  [TextBlockState.POSSIBLE]: ['#ffdf00', '#8b4513'],
  [TextBlockState.INCORRECT]: ['#dddddd', '#606060'],
};

const ColorMapDark: Record<TextBlockState, string[]> = {
  [TextBlockState.GUESS]: ['#303030', '#050505'],
  [TextBlockState.CORRECT]: ['#30ff44', '#005000'],
  [TextBlockState.POSSIBLE]: ['#ffdf00', '#8b4513'],
  [TextBlockState.INCORRECT]: ['#808080', '#282828'],
};

interface TextBlockProps {
  text: string;
  state: TextBlockState;
}

const TextBlock = (props: TextBlockProps) => {
  const {text, state} = props;
  const colorScheme = useColorScheme();

  return (
    <LinearGradient
      colors={colorScheme === 'dark' ? ColorMapDark[state] : ColorMap[state]}
      useAngle={true}
      angle={145}
      angleCenter={{x: 0.5, y: 0.5}}
      style={styles.container}>
      <Text
        style={[
          styles.text,
          {
            color: colorScheme === 'dark' ? '#eeeeee' : '#000',
          },
        ]}>
        {text.toUpperCase()}
      </Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: '15%',
    aspectRatio: 1,
    borderWidth: 1,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TextBlock;
