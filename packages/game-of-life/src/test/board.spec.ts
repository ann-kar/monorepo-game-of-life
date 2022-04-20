import { Board } from '../Board';

describe('GOL', () => {
  let game = new Board();
  beforeEach(() => {
    game = new Board();
  });
  it('should create new instance of class', () => {
    expect(game).toBeTruthy;
  });

  it('should create new game array and return it', () => {
    game.createBoard(3);
    expect(game.getBoard()).toHaveLength(3);
  });

  it('should calculate number o alive neighbors', () => {
    const board = [
      [0, 0, 0],
      [0, 1, 1],
      [0, 1, 0],
    ];
    game.createCustomBoard(board);
    const nei = game.getAllNeighbors(0, 0, board);
    expect(nei).toBe(1);
  });

  it('should calculate new board', () => {
    const board = [
      [0, 0, 0, 0, 0],
      [0, 1, 1, 0, 0],
      [0, 1, 0, 0, 0],
      [0, 0, 0, 1, 1],
      [0, 0, 0, 1, 0],
    ];
    const boardAfterTick = [
      [0, 0, 0, 0, 0],
      [0, 1, 1, 0, 0],
      [0, 1, 0, 1, 0],
      [0, 0, 1, 1, 1],
      [0, 0, 0, 1, 1],
    ];
    game.createCustomBoard(board);
    game.tick(board);
    expect(game.getBoard()).toEqual(boardAfterTick);
  });
});
