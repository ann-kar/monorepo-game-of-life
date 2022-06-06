import axios from 'axios';
import {
  IResponseStart,
  IResponseTick,
  Board,
} from '@gol-monorepo/interfaces';

const url = 'https://game-of-life-backend-app.herokuapp.com/api'

export class Api {
  static async sendBoard(data: Board): Promise<IResponseStart> {
    try {
      const response = await axios.post(`${url}/board/`, { board: data });
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
