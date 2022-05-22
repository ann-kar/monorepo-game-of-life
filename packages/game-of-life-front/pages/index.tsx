import { useEffect, useState } from 'react';
import produce from 'immer';

import Cell from '../components/Cell';
import { Api } from '../services/services';
import { Board, Coordinates } from '../interfaces/interfaces';
import Button from '../components/Button';
import Menu from '../components/menu/menu';
import { Header } from '../components/Header';
import { SizeInput } from '../components/SizeInput';
import { isSizeValid, isBoardEmpty } from '../utils/utils';

export function Index() {
  const [board, setBoard] = useState<Board>();
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [isAutoplayOn, setIsAutoplayOn] = useState<boolean>(false);
  const [boardId, setBoardId] = useState<string>();
  const [boardSize, setBoardSize] = useState<number>(10);

  useEffect(() => {
    if (isSizeValid(boardSize)) displayBoard(boardSize);
  }, [boardSize]);

  const startGame = async () => {
    if (isSizeValid(boardSize)) {
      const res = await Api.sendBoard(board);
      setBoardId(res.id);
      setHasStarted(true);
    }
  };

  const tick = async () => {
    const res = await Api.sendTick(boardId);
    setBoard(res.board);
  };

  const displayBoard = (size: number) => {
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
    <div className="container h-screen mx-auto max-w-3xl flex flex-col items-center">
      <Header />
      <div className="wrapper flex grow items-center">
        <div className="board grow shadow-2xl">
          {board &&
            board.map((row: number[], rowIndex) => {
              return (
                <div
                  className={`row flex ${hasStarted && 'pointer-events-none'}`}
                  key={rowIndex}
                >
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
      </div>
      <nav className="mt-8 h-40">
        <Menu>
          {hasStarted && (
            <>
              <Button onClick={tick} label={'next'} />
              <Button onClick={autoplay} label={'autoplay'} />
            </>
          )}
          {!hasStarted && (
            <>
              <Button onClick={startGame} label={'play'} />
              <Button
                onClick={addDefaultPattern}
                label={'add default pattern'}
              />
            </>
          )}
          <a href="./">
            {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
            <Button onClick={() => {}} label={'restart'} />
          </a>
          <SizeInput setBoardSize={setBoardSize} hasStarted={hasStarted} />
        </Menu>
      </nav>
    </div>
  );
}

export default Index;
