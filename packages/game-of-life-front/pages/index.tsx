import styles from './index.module.css';

import type { NextPage } from 'next';
import Head from 'next/head';
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
      game.setCell(3, 1);
      game.setCell(4, 1);
      game.setCell(2, 1);
      game.setCell(2, 2);
      game.setCell(4, 2);
      game.setCell(1, 2);
      const currentBoard = game.getBoard();
      setBoard(currentBoard);
      console.log(currentBoard);
    }
  }, [game]);

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
            {board?.map((row: number[], rowIndex) => {
              return (
                <div key={rowIndex} className={styles.row}>
                  {row.map((cell: number, colIndex) => {
                    return (
                      <div key={`${rowIndex}-${colIndex}`}>
                        {cell === 0 && <Cell isActive={false} />}
                        {cell === 1 && <Cell isActive={true} />}
                        {/* {cell === 0 && <div className={styles.cell} />}
                        {cell === 1 && <div className={styles.activeCell} />} */}
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
