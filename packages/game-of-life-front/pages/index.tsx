import { useEffect, useState } from 'react';
import produce from 'immer';

import Cell from '../components/Cell';
import { Api } from '../services/services';
import { ICoordinates, Board } from '@gol-monorepo/interfaces';
import Button from '../components/Button';
import { Header } from '../components/Header';
import { SizeInput } from '../components/SizeInput';
import { isSizeValid, isBoardEmpty } from '../utils/utils';

export function Index() {
  const [board, setBoard] = useState<Board>();
  const [prevBoard, setPrevBoard] = useState<Board>();
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [isAutoplayOn, setIsAutoplayOn] = useState<boolean>(false);
  const [boardId, setBoardId] = useState<string>();
  const [boardSize, setBoardSize] = useState<number>(10);
  const [isOver, setIsOver] = useState<boolean>(false);

  useEffect(() => {
    if (isSizeValid(boardSize)) displayBoard(boardSize);
  }, [boardSize]);

  useEffect(() => {
    if (prevBoard && JSON.stringify(board) === JSON.stringify(prevBoard)) {
      setIsOver(true);
      setIsAutoplayOn(false);
    }
  }, [board, prevBoard]);

  const startGame = async () => {
    if (isSizeValid(boardSize)) {
      const res = await Api.sendBoard(board);
      setBoard(res.board);
      setBoardId(res.id);
      setHasStarted(true);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const tick = async () => {
    const res = await Api.sendTick(boardId);
    setPrevBoard(board);
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

  const handleCellClick = (c: ICoordinates) => {
    if (!hasStarted) {
      setBoard(
        produce((draft) => {
          draft[c.row][c.col] = draft[c.row][c.col] === 1 ? 0 : 1;
        })
      );
    }
  };

  const addDefaultPattern = () => {
    const newBoard = new Array(boardSize)
      .fill(0)
      .map((_) => Array(boardSize).fill(0));
    const leftTop = Math.floor((boardSize - 5) / 2);
    if (!hasStarted) {
      newBoard[leftTop][leftTop + 1] = 1;
      newBoard[leftTop + 1][leftTop + 1] = 1;
      newBoard[leftTop + 1][leftTop + 2] = 1;
      newBoard[leftTop + 2][leftTop + 1] = 1;
      newBoard[leftTop + 2][leftTop + 2] = 1;
      newBoard[leftTop + 2][leftTop + 3] = 1;
      newBoard[leftTop + 3][leftTop + 1] = 1;
      newBoard[leftTop + 3][leftTop + 2] = 1;
      newBoard[leftTop + 4][leftTop + 1] = 1;
      setBoard(newBoard);
    }
  };

  const autoplay = () => {
    setIsAutoplayOn(!isAutoplayOn);
  };

  useEffect(() => {
    if (isAutoplayOn && !isEmpty) {
      const interval = setInterval(() => {
        tick();
      }, 200);
      return () => clearInterval(interval);
    }
  }, [isAutoplayOn, isEmpty, tick]);

  return (
    <div className="container h-screen mx-auto max-w-3xl flex flex-col items-center">
      <Header />
      <div className="wrapper flex grow items-center">
        <div className="board grow shadow-2xl">
          {board &&
            board.map((row: number[], rowIndex) => {
              return (
                <div
                  className={`row flex ${hasStarted && 'pointer-events-none'} ${
                    isOver && 'grayscale'
                  }`}
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
      <nav className="h-32 flex items-center justify-center">
        {hasStarted && (
          <>
            <Button onClick={tick} label={'next'} />
            <Button onClick={autoplay} label={'autoplay'} />
          </>
        )}
        {!hasStarted && (
          <>
            <Button onClick={startGame} label={'play'} />
            <Button onClick={addDefaultPattern} label={'add default pattern'} />
          </>
        )}
        <a href="./">
          {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
          <Button onClick={() => {}} label={'restart'} />
        </a>
        <SizeInput setBoardSize={setBoardSize} hasStarted={hasStarted} />
      </nav>
    </div>
  );
}

export default Index;
