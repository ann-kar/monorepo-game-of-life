import { Cell } from './Cell';

export class Board {
  board: number[][] = [];
  startingBoard: number[][] = [];

  createCustomBoard(board: number[][]) {
    this.board = board;
    return this;
  }

  getBoard(): number[][] {
    return this.board;
  }

  createBoard(arg0: number) {
    for (let i = 0; i < arg0; i++) {
      const toPush = [];
      for (let j = 0; j < arg0; j++) {
        toPush.push(0);
      }
      this.board.push(toPush);
    }
    return this;
  }

  getAllNeighbors(x: number, y: number, board: number[][]) {
    let aliveNeighbors = 0;
    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        if (j - 1 < 0 || j + 1 > board.length) continue;
        if (i - 1 < 0 || i + 1 > board.length) continue;
        if (i === x && j === y) continue;
        if (board[i][j] === 1) aliveNeighbors++;
      }
    }
    return aliveNeighbors;
  }

  tick(board: number[][]) {
    this.board = board;
    this.startingBoard = [...this.board];
    return (this.board = this.board.map((row, i) => {
      return row.map((col, j) => {
        const n = this.getAllNeighbors(i, j, this.startingBoard);
        const cell = new Cell(this.startingBoard[i][j], n).tick().getState();
        return cell;
      });
    }));
  }
}
