import axios from 'axios';
import {
  IResponseStart,
  IResponseTick,
  Board,
} from '@gol-monorepo/interfaces';

const url = "http://localhost:3333/api";
// const url =  'https://gol-backend.herokuapp.com/api';

export class Api {
  static async sendBoard(data: Board): Promise<IResponseStart> {
    try {
      const response = await axios.post(`${url}/board/`, { board: data });
      console.log("res:", response.data);
      return response.data;
    } catch (err: unknown) {
      throw new Error();
    }
  }

  static async sendTick(boardId: string): Promise<IResponseTick> {
    try {
      const response = await axios.post(`${url}/tick/`, { id: boardId });
      return response.data;
    } catch (err: unknown) {
      throw new Error();
    }
  }
}
