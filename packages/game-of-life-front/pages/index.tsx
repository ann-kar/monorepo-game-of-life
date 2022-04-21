import { useEffect, useState } from 'react';

import styles from './index.module.css';
import Cell from '../components/cell/cell';
import { Api } from '../services/services';
import { Board } from '../interfaces/interfaces';
import Button from '../components/button/button';
import produce from 'immer';
import Menu from '../components/menu/menu';

const isBoardEmpty = (board: Board): boolean => {
  return board
    .map((row) => {
      return row.every((cell) => cell === 0);
    })
    .every((result) => result === true);
};

export function Index() {
  const [board, setBoard] = useState<number[][]>();
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [isAutoplayOn, setIsAutoplayOn] = useState<boolean>(false);
  const [boardId, setBoardId] = useState<string>();
  const [wrongBoardSize, setWrongBoardSize] = useState<boolean>(false);
  const [boardSize, setBoardSize] = useState<number>(10);

  useEffect(() => {
    createBoard(boardSize);
  }, [boardSize]);

  const updateBoardSize = (size: number) => {
    if (size < 16 && size > 2) {
      setBoardSize(size);
      setWrongBoardSize(false);
    } else {
      setWrongBoardSize(true);
    }
  };

  const tick = () => {
    const res = Api.sendTick(boardId);
    res.then((res) => setBoard(res.board));
  };

  const createBoard = (size) => {
    const newBoard = new Array(size).fill(0).map((_) => Array(size).fill(0));
    setBoard(newBoard);
  };

  useEffect(() => {
    if (board) {
      isBoardEmpty(board) ? setIsEmpty(true) : setIsEmpty(false);
    }
  }, [board]);

  useEffect(() => {
    if (isAutoplayOn && !isEmpty) {
      const interval = setInterval(() => {
        tick();
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isAutoplayOn, isEmpty]);

  const setCell = (row: number, col: number) => {
    setBoard(
      produce((draft) => {
        if (draft[row][col] === 1) {
          draft[row][col] = 0;
        } else {
          draft[row][col] = 1;
        }
      })
    );
  };

  const startGame = () => {
    const res = Api.sendBoard(board);
    res.then((res) => {
      setBoardId(res.id);
    });
    setHasStarted(true);
  };

  const addDefaultPattern = () => {
    setCell(2, 1);
    setCell(2, 2);
    setCell(2, 3);
    setCell(2, 4);
    setCell(3, 3);
    setCell(4, 1);
    setCell(4, 2);
  };

  const autoplay = () => {
    setIsAutoplayOn(!isAutoplayOn);
  };

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <h1 className={styles.header}>Game of life</h1>
        <div className={styles.inputCnt}>
          <label className={styles.label} htmlFor="sizeInput">
            set board size:
          </label>
          <input
            id="sizeInput"
            type="number"
            placeholder="10"
            min="3"
            max="15"
            className={styles.input}
            onChange={(e) => updateBoardSize(Number(e.target.value))}
            disabled={hasStarted}
          />
        </div>
        <small className={styles.message}>
          {wrongBoardSize
            ? 'please provide a number in the range from 3 to 15'
            : ''}
        </small>
        <div className="board" data-testid="board">
          {board?.map((row: number[], rowIndex) => {
            return (
              <div key={rowIndex} className={styles.row}>
                {row.map((cell: number, colIndex) => {
                  return (
                    <div key={`${rowIndex}-${colIndex}`}>
                      <Cell
                        isActive={cell ? true : false}
                        setCell={hasStarted ? () => {} : setCell}
                        row={rowIndex}
                        col={colIndex}
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <nav className={styles.nav}>
          <Menu>
            {!hasStarted && <h3 className={styles.info}>create your starting pattern or use default</h3>}
            {hasStarted && (
              <>
                <Button onClick={tick} label={'tick'} />
                <Button onClick={autoplay} label={'autoplay'} />
              </>
            )}
            {!hasStarted && (
              <>
                <Button onClick={startGame} label={'start'} />
                <Button onClick={addDefaultPattern} label={'default'} />
              </>
            )}
            <a className={styles.link} href="./">
              <Button onClick={() => {}} label={'restart'} />
            </a>
          </Menu>
        </nav>
      </div>
    </div>
  );
}

export default Index;
