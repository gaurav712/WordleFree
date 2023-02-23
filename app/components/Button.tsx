import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, useColorScheme, View} from 'react-native';

interface ButtonProps {
  cta: string;
  onPress(): void;
}

const Button = (props: ButtonProps) => {
  const {cta, onPress} = props;
  const colorScheme = useColorScheme();

  const [isPressedIn, setIsPressedIn] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setIsPressedIn(true)}
      onPressOut={() => setIsPressedIn(false)}>
      <View
        style={[
          {
            borderColor: colorScheme === 'dark' ? '#eeeeee' : '#282828',
            backgroundColor: colorScheme === 'dark' ? '#282828' : '#eeeeee',
          },
          styles.button,
          isPressedIn && styles.active,
        ]}>
        <Text
          style={[
            styles.cta,
            {
              color: colorScheme === 'dark' ? '#eeeeee' : '#000',
            },
          ]}>
          {cta}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 4,
  },
  cta: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  active: {
    elevation: 2,
  },
});

export default Button;
