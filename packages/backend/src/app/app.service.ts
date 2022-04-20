import { Injectable } from '@nestjs/common';
import { Board } from '@gol-monorepo/game-of-life';
import { CreateBoardDto } from './dto/createBoard.dto';
import { GetTickDto } from './dto/getTick.dto';
import { v4 as uuidv4 } from 'uuid';
import produce from 'immer';

interface IBoard {
  id: string | number;
  board: number[][];
}
class LocalDB {
  constructor(private db: IBoard[] = []) {}
  addToDB(board) {
    this.db.push(board);
    return this;
  }
  findBoard(id: string) {
    const find = this.db.find((el) => el.id == id);
    return find ? find : false;
  }
  updateBoard(id: string, newBoard: number[][]) {
    const nextState = produce(this.db, (draft) => {
      const index = this.db.findIndex((el) => el.id == id);
      draft[index].board = newBoard;
    });
    return nextState;
  }
}

@Injectable()
export class AppService {
  db = new LocalDB();

  createBoard(createBoardDto: CreateBoardDto) {
    const game = new Board().createCustomBoard(createBoardDto.board).getBoard();
    const boardObj = {
      board: game,
      id: uuidv4(),
    };
    this.db.addToDB(boardObj);
    return boardObj;
  }
  getTick(getTickDto: GetTickDto) {
    const board = this.db.findBoard(getTickDto.id);
    if (board) {
      const game = new Board().tick(board.board);
      return {
        id: board.id,
        board: game,
        generation: 0,
      };
    } else {
      return false;
    }
  }
}
