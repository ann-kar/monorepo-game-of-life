import { Injectable } from '@nestjs/common';
import { Board } from '@gol-monorepo/game-of-life';
import { CreateBoardDto } from './dto/createBoard.dto';
import { GetTickDto } from './dto/getTick.dto';
import { v4 as uuidv4 } from 'uuid';
import produce from 'immer';

interface IBoard {
  id: string | number;
  board: number[][];
  updatedAt?: number;
  generation: number;
}
class LocalDB {
  constructor(public db: IBoard[] = []) {}
  addToDB(board) {
    return new LocalDB(this.db.concat(board));
  }
  findBoard(id: string) {
    const find = this.db.find((el) => el.id == id);
    return find ? find : false;
  }
  updateBoard(id: string, newBoard: number[][]) {
    const nextState = produce(this.db, (draft) => {
      const index = this.db.findIndex((el) => el.id == id);
      const find = this.db.find((el) => el.id == id);
      draft[index].board = newBoard;
      draft[index].updatedAt = Date.now();
      draft[index].generation = find.generation + 1;
    });
    return new LocalDB(nextState);
  }
}

let db = new LocalDB();

@Injectable()
export class AppService {
  generateBoard(param: { size: string }) {
    const game = new Board().createBoard(Number(param.size)).getBoard();
    return {
      board: game,
      size: param.size,
    };
  }

  createBoard(createBoardDto: CreateBoardDto) {
    const game = new Board().createCustomBoard(createBoardDto.board).getBoard();
    const boardObj = {
      board: game,
      id: uuidv4(),
      updatedAt: Date.now(),
      generation: 0,
    };
    db = db.addToDB(boardObj);
    return boardObj;
  }
  getTick(getTickDto: GetTickDto) {
    const board = db.findBoard(getTickDto.id);
    // console.dir(this.db.db);
    if (board) {
      const game = new Board().tick(board.board);
      db = db.updateBoard(String(board.id), game);
      const newBoard = db.findBoard(String(board.id));
      if (newBoard) {
        return {
          id: board.id,
          board: newBoard.board,
          generation: newBoard.generation,
        };
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
