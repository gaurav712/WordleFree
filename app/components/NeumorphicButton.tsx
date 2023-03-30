/*
 * Credits to https://github.com/craftzdog for the original code
 */

import {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  useColorScheme,
} from 'react-native';

const size = 10;
const buttonCommonStyle = {
  borderRadius: size,
  shadowRadius: size * 1.5,
};
const buttonOuterStyle = {
  shadowOffset: {width: size, height: size},
};
const buttonInnerStyle = {
  shadowOffset: {width: -size, height: -size},
};

const NeumorphicButton = ({
  children,
  disabled = false,
  onPress = () => {},
}: {
  children: React.ReactNode;
  disabled?: boolean;
  onPress?: () => void;
}) => {
  const [isDown, setDown] = useState(false);
  const [gradColors, setGradColors] = useState<string[]>(['#808080', '#000']);
  const colorScheme = useColorScheme();

  const handlePressIn = async () => {
    setDown(true);
  };

  const handlePressOut = async () => {
    setDown(false);
  };

  useEffect(() => {
    setGradColors(
      colorScheme === 'dark'
        ? isDown
          ? ['#000', '#808080']
          : ['#808080', '#000']
        : isDown
        ? ['#fff', '#909090']
        : ['#909090', '#fff'],
    );
  }, [isDown]);

  return (
    <TouchableWithoutFeedback
      disabled={disabled}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}>
      <View style={[styles.buttonOuter, buttonCommonStyle, buttonOuterStyle]}>
        <View style={[styles.buttonInner, buttonCommonStyle, buttonInnerStyle]}>
          <LinearGradient
            colors={gradColors}
            useAngle={true}
            angle={145}
            angleCenter={{x: 0.5, y: 0.5}}
            style={[styles.buttonFace]}>
            {children}
          </LinearGradient>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  buttonOuter: {
    margin: 3,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 5,
    shadowOffset: {width: 10, height: 10},
    shadowColor: '#000',
    shadowOpacity: 1.0,
    shadowRadius: 10,
  },
  buttonInner: {
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowOffset: {width: -10, height: -10},
    shadowColor: '#000',
    shadowOpacity: 1.0,
    shadowRadius: 10,
  },
  buttonFace: {
    borderRadius: 5,
  },
});

export default NeumorphicButton;
