import { useEffect, useState } from 'react';
import produce from 'immer';

import Cell from '../components/cell/cell';
import { Api } from '../services/services';
import { Board, Coordinates } from '../interfaces/interfaces';
import Button from '../components/button/button';
import Menu from '../components/menu/menu';
import { Header } from '../components/Header';

const isBoardEmpty = (board: Board): boolean => {
  return board
    .map((row) => {
      return row.every((cell) => cell === 0);
    })
    .every((result) => result === true);
};

export function Index() {
  const [board, setBoard] = useState<Board>();
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [isAutoplayOn, setIsAutoplayOn] = useState<boolean>(false);
  const [boardId, setBoardId] = useState<string>();
  const [wrongBoardSize, setWrongBoardSize] = useState<boolean>(false);
  const [boardSize, setBoardSize] = useState<number>(10);

  useEffect(() => {
    displayBoard(boardSize);
  }, [boardSize]);

  const updateBoardSize = (size: number) => {
    if (size < 16 && size > 2) {
      setBoardSize(size);
      setWrongBoardSize(false);
    } else {
      setWrongBoardSize(true);
    }
  };

  const startGame = async () => {
    const res = await Api.sendBoard(board);
    setBoardId(res.id);
    setHasStarted(true);
  };

  const tick = async () => {
    const res = await Api.sendTick(boardId);
    setBoard(res.board);
  };

  const displayBoard = (size:number) => {
    const newBoard = new Array(size).fill(0).map((_) => Array(size).fill(0));
    setBoard(newBoard);
  };

  useEffect(() => {
    if (board) {
      isBoardEmpty(board) ? setIsEmpty(true) : setIsEmpty(false);
    }
  }, [board]);

  const handleCellClick = (c: Coordinates) => {
    if (!hasStarted) {
      setBoard(
        produce((draft) => {
          draft[c.row][c.col] = draft[c.row][c.col] === 1 ? 0 : 1;
        })
      );
    }
  };

  const addDefaultPattern = () => {
    if (!hasStarted) {
      setBoard(
        produce((draft) => {
          draft[2][1] = 1;
          draft[2][1] = 1;
          draft[2][2] = 1;
          draft[0][2] = 1;
          draft[1][2] = 1;
        })
      );
    }
  };

  const autoplay = () => {
    setIsAutoplayOn(!isAutoplayOn);
  };

  useEffect(() => {
    if (isAutoplayOn && !isEmpty) {
      const interval = setInterval(() => {
        tick();
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isAutoplayOn, isEmpty]);

  return (
    <div className="container mx-auto max-w-md flex flex-col items-center">
      <Header />
      <div className="m-2">
        <label htmlFor="sizeInput">BOARD SIZE:</label>
        <input
          id="sizeInput"
          type="number"
          placeholder="10"
          min="3"
          max="15"
          onChange={(e) => updateBoardSize(Number(e.target.value))}
          disabled={hasStarted}
        />
        <small>
          {wrongBoardSize
            ? 'please provide a number in the range from 3 to 15'
            : ''}
        </small>
      </div>

      <div className="board">
        {board &&
          board.map((row: number[], rowIndex) => {
            return (
              <div className="row flex" key={rowIndex}>
                {row.map((cell, colIndex) => {
                  return (
                    <Cell
                      isActive={!!cell}
                      row={rowIndex}
                      col={colIndex}
                      key={`${rowIndex}-${colIndex}`}
                      handleCellClick={handleCellClick}
                    />
                  );
                })}
              </div>
            );
          })}
      </div>

      <nav>
        <Menu>
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
          <a href="./">
            {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
            <Button onClick={() => {}} label={'restart'} />
          </a>
        </Menu>
      </nav>
    </div>
  );
}

export default Index;
