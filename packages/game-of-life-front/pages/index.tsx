import { useEffect, useState } from 'react';
import { GameOfLife } from '@gameoflife-nrwl/game-of-life-algr';

import styles from './index.module.css';
import Cell from '../components/cell/cell';
import { Api } from '../services/services';
import { Board } from '../interfaces/interfaces';
import Button from '../components/button/button';

const isBoardEmpty = (board: Board): boolean => {
  return board
    .map((row) => {
      return row.every((cell) => cell === 0);
    })
    .every((result) => result === true);
};

export function Index() {
  const [game, setGame] = useState<any>();
  const [board, setBoard] = useState<number[][]>();
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [isAutoplayOn, setIsAutoplayOn] = useState<boolean>(false);
  const [boardId, setBoardId] = useState<string>();

  useEffect(() => {
    const g = new GameOfLife(10, 10);
    setGame(g);
  }, []);

  const setBoardSize = (size: number) => {
    const g = new GameOfLife(size, size);
    setGame(g);
  };

  const tick = () => {
    const res = Api.sendTick(boardId);
    res.then((res) => setBoard(res.board));
  };

  useEffect(() => {
    if (game) {
      const currentBoard = game.getBoard();
      setBoard(currentBoard);
    }
  }, [game]);

  useEffect(() => {
    if (board && isBoardEmpty(board)) {
      setIsEmpty(true);
    }
  }, [board]);

  useEffect(() => {
    if (isAutoplayOn) {
      const interval = setInterval(() => {
        tick();
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isAutoplayOn, isEmpty]);

  const setCell = (row: number, col: number) => {
    if (board[row][col] == 1) {
      board[row][col] = 0;
    } else {
      board[row][col] = 1;
    }
  };

  const startGame = () => {
    const res = Api.sendBoard(board);
    res.then((res) => {
      setBoardId(res.id);
    });
    setHasStarted(true);
  };

  const startWithDefault = () => {
    game.setCell(1, 1);
    game.setCell(1, 2);
    game.setCell(2, 2);
    game.setCell(3, 2);
    game.setCell(4, 2);
    game.setCell(4, 3);
    const res = Api.sendBoard(board);
    res.then((res) => {
      setBoardId(res.id);
    });
    setHasStarted(true);
  };

  const autotick = () => {
    setIsAutoplayOn(!isAutoplayOn);
  };

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <h1 className={styles.header}>Game of life</h1>
        <div className="board" data-testid="board">
          {board?.map((row: number[], rowIndex) => {
            return (
              <div key={rowIndex} className={styles.row}>
                {row.map((cell: number, colIndex) => {
                  return (
                    <div key={`${rowIndex}-${colIndex}`}>
                      {hasStarted && <Cell isActive={cell ? true : false} />}
                      {!hasStarted && (
                        <Cell
                          isActive={false}
                          setCell={setCell}
                          row={rowIndex}
                          col={colIndex}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <input onChange={(e) => setBoardSize(Number(e.target.value))} />
        <nav>
          <Button onClick={startGame} label={'start'} />
          <Button onClick={startWithDefault} label={'default'} />
          <Button onClick={tick} label={'tick'} />
          <Button onClick={autotick} label={'autoplay'} />
          <a className={styles.link} href="./"><Button onClick={() => {}} label={'restart'} /></a>
        </nav>
      </div>
    </div>
  );
}

export default Index;
