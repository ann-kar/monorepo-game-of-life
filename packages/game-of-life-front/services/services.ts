import axios from 'axios';

import { Board, IResponse, IResponseDefault } from '../interfaces/interfaces';

export class Api {
  static async sendBoard(data: Board): Promise<IResponse> {
    const url = 'http://localhost:3333/api/board';
    try {
      const response = await axios.post(url, { board: data });
      return response.data;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  static async sendTick(boardId: string): Promise<any> {
    const url = 'http://localhost:3333/api/tick';
    try {
      const response = await axios.post(url, { id: boardId });
      return response.data;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
