import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import Keyboard, {SpecialKeyboardKeys} from './components/Keyboard';
import ScreenHeader from './components/ScreenHeader';
import TextBlock, {TextBlockState} from './components/TextBlock';
import {MAX_GUESSES, MAX_WORD_LEN} from './constants/gameConstants';
import {getInitialBoard, getRandomWord, isWord} from './gameUtils';

const BOARD_TEMPLATE = getInitialBoard();

const GameScreen = () => {
  const [guessList, setGuessList] = useState<string[]>([]);
  const [inputWord, setInputWord] = useState<string>('');
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [disabledLetters, setDisabledLetters] = useState<string[]>([]);

  const wordToGuess = useRef<string>('xxxxx');

  const colorScheme = useColorScheme();

  useEffect(() => {
    if (gameOver === false) {
      wordToGuess.current = getRandomWord();
      setInputWord('');
      setGuessList([]);
    }
  }, [gameOver]);

  useEffect(() => {
    const guessLen = guessList.length;
    if (guessList[guessLen - 1] === wordToGuess.current) {
      setGameOver(true);
    } else if (guessLen === MAX_GUESSES) {
      setGameOver(true);
    }
  }, [guessList]);

  useEffect(() => {
    const list: string[] = [];

    guessList.forEach(word => {
      word.split('').forEach(letter => {
        if (!wordToGuess.current.includes(letter)) {
          list.push(letter);
        }
      });
    });

    setDisabledLetters(list);
  }, [guessList]);

  const onKeyPress = async (key: string) => {
    if (key === SpecialKeyboardKeys.DELETE) {
      setInputWord(inputWord.slice(0, -1));
    } else if (key === SpecialKeyboardKeys.SUBMIT) {
      setGuessList(prev => [...prev, inputWord.toUpperCase()]);
    } else {
      setInputWord(inputWord.length === 5 ? inputWord : inputWord + key);
    }
  };

  return (
    <View style={styles.fg1}>
      <ScreenHeader />
      {BOARD_TEMPLATE.map((row, rowIndex) => {
        return (
          <View
            key={`row-${rowIndex}`}
            style={[
              styles.row,
              {
                opacity: gameOver ? 0.3 : 1,
              },
            ]}>
            {row.map((_, colIndex) => {
              const guessLetter = guessList[rowIndex]?.[colIndex];
              let state: TextBlockState = TextBlockState.GUESS;

              if (guessLetter === undefined) {
                state = TextBlockState.GUESS;
              } else if (guessLetter === wordToGuess.current[colIndex]) {
                state = TextBlockState.CORRECT;
              } else if (wordToGuess.current.includes(guessLetter)) {
                state = TextBlockState.POSSIBLE;
              } else {
                state = TextBlockState.INCORRECT;
              }

              const letterToShow =
                rowIndex === guessList.length
                  ? inputWord[colIndex]
                  : guessLetter;

              return (
                <View style={styles.mh2} key={`col-${colIndex}`}>
                  <TextBlock text={letterToShow || ''} state={state} />
                </View>
              );
            })}
          </View>
        );
      })}

      <View
        style={[
          styles.bottomContainer,
          {
            opacity: gameOver ? 0.3 : 1,
          },
        ]}>
        <Keyboard
          disabledKeyList={[
            ...disabledLetters,
            inputWord.length !== MAX_WORD_LEN || !isWord(inputWord)
              ? SpecialKeyboardKeys.SUBMIT
              : '',
          ]}
          onKeyPress={onKeyPress}
        />
      </View>
      {gameOver ? (
        <View
          style={[
            styles.overlay,
            {
              backgroundColor:
                colorScheme === 'dark' ? '#282828ee' : '#eeeeeeee',
              borderColor: colorScheme === 'dark' ? '#ebdbb2' : '#000',
            },
          ]}>
          <Text
            style={[
              styles.text,
              styles.gameOver,
              {
                color: colorScheme === 'dark' ? '#ebdbb2' : '#000',
              },
            ]}>
            {wordToGuess.current === inputWord
              ? 'you got it!'
              : 'game over! :('}
          </Text>
          <Text
            style={[
              styles.text,
              {
                color: colorScheme === 'dark' ? '#ebdbb2' : '#000',
              },
            ]}>
            the word was : {wordToGuess.current.toLowerCase()}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setInputWord('');
              setGameOver(false);
            }}
            style={[
              styles.button,
              {
                borderColor: colorScheme === 'dark' ? '#ebdbb2' : '#000',
              },
            ]}>
            <Text
              style={[
                styles.text,
                styles.buttonText,
                {
                  color: colorScheme === 'dark' ? '#ebdbb2' : '#000',
                },
              ]}>
              ↻ play again
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mb10: {
    marginBottom: 10,
  },
  mh2: {
    marginHorizontal: 2,
  },
  fg1: {
    flexGrow: 1,
    height: '100%',
    justifyContent: 'space-between',
  },
  gameOver: {
    fontSize: 48,
  },
  text: {
    fontSize: 24,
    fontFamily: 'RetrocrazeRegular',
    letterSpacing: 1.5,
    marginVertical: 24,
  },
  button: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  buttonText: {
    marginVertical: 0,
  },
  row: {
    marginBottom: 4,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bottomContainer: {
    flexGrow: 1,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GameScreen;
