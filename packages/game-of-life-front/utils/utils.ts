import { Board } from '@gol-monorepo/interfaces';

export const isSizeValid = (size: number) => {
  return size < 11 && size > 2;
};

export const isBoardEmpty = (board: Board): boolean => {
  return board
    .map((row) => {
      return row.every((cell) => cell === 0);
    })
    .every((result) => result === true);
};
