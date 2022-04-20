import styles from './index.module.css';

import { GameOfLife } from '@gameoflife-nrwl/game-of-life-algr';
import { useEffect, useState } from 'react';
import Cell from '../components/cell/cell';
import Link from 'next/link';

const isBoardEmpty = (board: number[][]): boolean => {
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

  useEffect(() => {
    const g = new GameOfLife(10, 10);
    setGame(g);
  }, []);

  const tick = () => {
    game.tick();
    let currentBoard = game.getBoard();
    setBoard(currentBoard);
  };

  useEffect(() => {
    if (game) {
      const currentBoard = game.getBoard();
      setBoard(currentBoard);
    }
  }, [game]);

  useEffect(() => {
    if (board && isBoardEmpty(board)) {
      console.log('board empty');
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
    game.setCell(row, col);
  };

  const startGame = () => {
    setHasStarted(true);
  };

  const startWithDefault = () => {
    game.setCell(1, 1);
    game.setCell(1, 2);
    game.setCell(2, 2);
    game.setCell(3, 2);
    game.setCell(4, 2);
    game.setCell(4, 3);
    setHasStarted(true);
  }

  const restart = () => {
    setHasStarted(false);
    const g = new GameOfLife(10, 10);
    setGame(g);
  }

  const autotick = () => {
    setIsAutoplayOn(!isAutoplayOn);
  };

  return (
    <div className={styles.page}>
      <div className="wrapper">
        <div className="container">
          <div id="welcome">
            <h1>Game of life</h1>
          </div>
          <div className="board">
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
          <button
            onClick={startGame}
            className={`${styles.button} ${hasStarted && styles.activeButton}`}
          >
            start
          </button>
          <button
            onClick={startWithDefault}
            className={`${styles.button} ${hasStarted && styles.activeButton}`}
          >
            start with default pattern
          </button>
          <button onClick={tick} className={styles.button}>
            tick
          </button>
          <button onClick={autotick} className={styles.button}>
            autoplay
          </button>
          <button onClick={restart} className={styles.button}>
            restart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Index;
