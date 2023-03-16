import fiveLetterWords from './constants/fiveLetterWords.json';

export const getInitialBoard = (): string[][] => {
  const board: string[][] = [];
  for (let i = 0; i < 6; i++) {
    board.push(new Array(5).fill(''));
  }

  return board;
};

export const getRandomWord = (): string => {
  const len = fiveLetterWords.length;
  const randomIndex = Math.floor(Math.random() * 100000) % len;
  return fiveLetterWords[randomIndex].toUpperCase();
};

export const getWordleEmoji = (word: string, guessList: string[]): string => {
  let output = '';
  guessList.forEach(row => {
    let line = '';

    row.split('').forEach((char, colIndex) => {
      if (char === word[colIndex]) {
        line += '🟩';
      } else if (word.includes(char)) {
        line += '🟨';
      } else {
        line += '⬜️';
      }
    });

    output += line + '\n';
  });

  return output;
};

export const isWord = (word: string): boolean => {
  return fiveLetterWords.includes(word.toLowerCase());
};
