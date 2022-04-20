import styles from './index.module.css';

import { GameOfLife } from '@gameoflife-nrwl/game-of-life-algr';
import { useEffect, useState } from 'react';
import Cell from '../components/cell/cell';

export function Index() {
  const [game, setGame] = useState<any>();
  const [board, setBoard] = useState<number[][]>();
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  useEffect(() => {
    const g = new GameOfLife(10, 10);
    setGame(g);
  }, []);

  useEffect(() => {
    if (game) {
      const currentBoard = game.getBoard();
      setBoard(currentBoard);
      console.log(currentBoard);
    }
  }, [game]);

  const setCell = (row: number, col: number) => {
    game.setCell(row, col);
  };
  const startGame = () => {
    setHasStarted(true);
  };

  const tick = () => {
    game.tick();
    let currentBoard = game.getBoard();
    setBoard(currentBoard);
  };

  return (
    <div className={styles.page}>
      <div className="wrapper">
        <div className="container">
          <div id="welcome">
            <h1>Game of life</h1>
          </div>
          <div className="board">
            {!hasStarted &&
              board?.map((row: number[], rowIndex) => {
                return (
                  <div key={rowIndex} className={styles.row}>
                    {row.map((cell: number, colIndex) => {
                      return (
                        <div key={`${rowIndex}-${colIndex}`}>
                          <Cell
                            isActive={false}
                            setCell={setCell}
                            row={rowIndex}
                            col={colIndex}
                          />
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            {hasStarted &&
              board?.map((row: number[], rowIndex) => {
                return (
                  <div key={rowIndex} className={styles.row}>
                    {row.map((cell: number, colIndex) => {
                      return (
                        <div key={`${rowIndex}-${colIndex}`}>
                          <Cell isActive={cell ? true : false} />
                        </div>
                      );
                    })}
                  </div>
                );
              })}
          </div>
          <button onClick={startGame} className={styles.button}>
            start
          </button>
          <button onClick={tick} className={styles.button}>
            tick
          </button>
        </div>
      </div>
    </div>
  );
}

export default Index;
