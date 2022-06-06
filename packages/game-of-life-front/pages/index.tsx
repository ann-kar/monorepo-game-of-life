import { useEffect, useState } from 'react';
import produce from 'immer';

import Cell from '../components/Cell';
import { Api } from '../services/services';
import { ICoordinates, Board } from '@gol-monorepo/interfaces';
import Button from '../components/Button';
import { Header } from '../components/Header';
import { SizeInput } from '../components/SizeInput';
import { isSizeValid, isBoardEmpty } from '../utils/utils';

type BoardStatus = 'empty' | 'filled';
type GameStatus = 'initialized' | 'inPrep' | 'on' | 'onAutoplay' | 'over';

export function Index() {
  const [boardStatus, setBoardStatus] = useState<BoardStatus>('empty');
  const [gameStatus, setGameStatus] = useState<GameStatus>('initialized');
  const [board, setBoard] = useState<Board>();
  const [boardId, setBoardId] = useState<string>();
  const [boardSize, setBoardSize] = useState<number>(10);
  const [prevBoard, setPrevBoard] = useState<Board>();

  useEffect(() => {
    if (isSizeValid(boardSize)) displayBoard(boardSize);
  }, [boardSize]);

  useEffect(() => {
    if (prevBoard && JSON.stringify(board) === JSON.stringify(prevBoard)) {
      setGameStatus('over');
    }
  }, [board, prevBoard]);

  const startGame = async () => {
    if (isSizeValid(boardSize)) {
      const res = await Api.sendBoard(board);
      setBoardId(res.id);
      setGameStatus('on');
      const res2 = await Api.sendTick(res.id);
      setPrevBoard(res.board);
      setBoard(res2.board);
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
      isBoardEmpty(board) ? setBoardStatus('empty') : setBoardStatus('filled');
    }
  }, [board]);

  const handleCellClick = (c: ICoordinates) => {
    if (gameStatus === 'inPrep' || gameStatus === 'initialized') {
      setBoard(
        produce((draft) => {
          draft[c.row][c.col] = draft[c.row][c.col] === 1 ? 0 : 1;
        })
      );
    }
    if (gameStatus === 'initialized') setGameStatus('inPrep')
  };

  const addDefaultPattern = () => {
    const newBoard = new Array(boardSize)
      .fill(0)
      .map((_) => Array(boardSize).fill(0));
    const leftTop = Math.floor((boardSize - 5) / 2);
    if (gameStatus === 'inPrep' || gameStatus === 'initialized') {
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
      setBoardStatus('filled');
      setGameStatus('inPrep');
    }
  };

  const autoplay = () => {
    if (gameStatus === 'on') {
      setGameStatus('onAutoplay');
    } else if (gameStatus === 'onAutoplay') {
      setGameStatus('on');
    }
  };

  useEffect(() => {
    if (gameStatus === 'onAutoplay' && boardStatus === 'filled') {
      const interval = setInterval(() => {
        tick();
      }, 200);
      return () => clearInterval(interval);
    }
  }, [boardStatus, gameStatus, tick]);

  return (
    <div className="container h-screen mx-auto max-w-3xl flex flex-col items-center">
      <Header />
      <div className="wrapper flex grow items-center">
        <div className="board relative grow shadow-2xl">
          {board &&
            board.map((row: number[], rowIndex) => {
              return (
                <div
                  className={`row   flex ${
                    (gameStatus !== 'inPrep' && gameStatus !== 'initialized') && 'pointer-events-none'
                  } ${gameStatus === 'over' && 'grayscale'}`}
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
          {gameStatus === 'initialized' && boardStatus === 'empty' && (
            <div className="absolute top-0 left-0 w-[100%] px-1 leading-10 text-emerald-700 font-bold ">
              Select some tiles or set the default pattern. Then click START and
              see what happens!
            </div>
          )}
        </div>
      </div>
      <nav className="h-32 flex items-center justify-center">
        {(gameStatus === 'on' || gameStatus === 'onAutoplay') && (
          <>
            <Button onClick={tick} label={'next'} />
            <Button onClick={autoplay} label={'autoplay'} />
          </>
        )}
        {(gameStatus === 'inPrep' || gameStatus === 'initialized') && (
          <>
            <Button onClick={startGame} label={'start'} />
            <Button onClick={addDefaultPattern} label={'set default pattern'} />
          </>
        )}
        <a href="./">
          {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
          <Button onClick={() => {}} label={'restart'} />
        </a>
        <SizeInput
          setBoardSize={setBoardSize}
          isDisabled={(gameStatus === 'inPrep' || gameStatus === 'initialized') ? false : true}
        />
      </nav>
    </div>
  );
}

export default Index;
