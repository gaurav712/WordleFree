import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet, Text, View, useColorScheme} from 'react-native';
import Button from './components/Button';
import Keyboard, {SpecialKeyboardKeys} from './components/Keyboard';
import ScreenHeader from './components/ScreenHeader';
import TextBlock, {TextBlockState} from './components/TextBlock';
import {MAX_GUESSES, MAX_WORD_LEN} from './constants/gameConstants';
import {
  getInitialBoard,
  getRandomWord,
  getWordleEmoji,
  isWord,
} from './gameUtils';

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

  const onKeyPress = useCallback(
    (key: string) => {
      if (key === SpecialKeyboardKeys.DELETE) {
        setInputWord(prev => prev.slice(0, -1));
      } else if (key === SpecialKeyboardKeys.SUBMIT) {
        setGuessList(prev => [...prev, inputWord.toUpperCase()]);
        setInputWord('');
      } else if (key.length === 1) {
        setInputWord(prev => {
          if (prev.length < MAX_WORD_LEN && !disabledLetters.includes(key)) {
            return prev + key;
          }

          return prev;
        });
      }
    },
    [disabledLetters, inputWord],
  );

  const wordleEmoji: string = useMemo(() => {
    if (!gameOver) {
      return '';
    }

    return getWordleEmoji(wordToGuess.current, guessList);
  }, [gameOver, guessList]);

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
              backgroundColor: colorScheme === 'dark' ? '#282828' : '#eeeeee',
              borderColor: colorScheme === 'dark' ? '#ebdbb2' : '#000',
            },
          ]}>
          <Text
            style={[
              styles.text,
              styles.mb12,
              {
                color: colorScheme === 'dark' ? '#ebdbb2' : '#000',
              },
            ]}>
            Game Over!
          </Text>
          <Text
            style={[
              styles.text,
              styles.mb12,
              {
                color: colorScheme === 'dark' ? '#ebdbb2' : '#000',
              },
            ]}>
            The word was : {wordToGuess.current}
          </Text>
          <Text
            style={[
              styles.text,
              {
                color: colorScheme === 'dark' ? '#ebdbb2' : '#000',
              },
            ]}
            selectable>
            {wordleEmoji}
          </Text>

          <View style={styles.buttonRow}>
            <View style={styles.buttonSpacer} />
            <Button cta="Play Again" onPress={() => setGameOver(false)} />
          </View>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mb12: {
    marginBottom: 12,
  },
  mh2: {
    marginHorizontal: 2,
  },
  fg1: {
    flexGrow: 1,
    height: '100%',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 22,
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
  score: {
    fontSize: 14,
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
  },
  buttonSpacer: {
    width: 12,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    elevation: 10,
    width: '90%',
    height: '60%',
    marginVertical: '20%',
    marginHorizontal: '5%',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 10,
  },
});

export default GameScreen;
