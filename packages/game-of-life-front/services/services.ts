import axios from 'axios';

import { Board, IResponse } from '../interfaces/interfaces';

export class Api {
  static async sendBoard(data: Board): Promise<IResponse> {
    const url = `https://game-of-life-backend-app.herokuapp.com/api/board`;
    try {
      const response = await axios.post(url, { board: data });
      return response.data;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  static async sendTick(boardId: string): Promise<any> {
    const url = 'https://game-of-life-backend-app.herokuapp.com/api/tick';
    try {
      const response = await axios.post(url, { id: boardId });
      return response.data;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
