import React from 'react';
import {Pressable, StyleSheet, Text, useColorScheme, View} from 'react-native';

interface KeyboardProps {
  onKeyPress(char: string): void;
  disabledKeyList: string[];
}

export enum SpecialKeyboardKeys {
  SUBMIT = 'Submit',
  DELETE = 'Delete',
}

const keySequence: string[][] = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
  [SpecialKeyboardKeys.SUBMIT, SpecialKeyboardKeys.DELETE],
];

const Keyboard = (props: KeyboardProps) => {
  const {onKeyPress, disabledKeyList} = props;

  const colorScheme = useColorScheme();

  return (
    <>
      {keySequence.map((row, rowIndex) => {
        return (
          <View key={'key-row-' + rowIndex} style={styles.row}>
            {row.map(key => {
              const isDisabled = disabledKeyList.includes(key);
              return (
                <Pressable
                  key={key}
                  disabled={isDisabled}
                  onPress={() => onKeyPress(key)}>
                  <View
                    style={[
                      styles.cell,
                      isDisabled && styles.cellDisabled,
                      {
                        borderColor:
                          colorScheme === 'dark' ? '#eeeeee' : '#282828',
                      },
                    ]}>
                    <Text
                      style={[
                        styles.text,
                        {
                          color: colorScheme === 'dark' ? '#eeeeee' : '#000',
                        },
                      ]}>
                      {key}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  cell: {
    padding: 5,
    paddingHorizontal: 8,
    margin: 4,
    borderRadius: 2,
    borderWidth: 1,
  },
  cellDisabled: {
    opacity: 0.3,
  },
  text: {
    fontSize: 16,
  },
});

export default Keyboard;
