import axios from 'axios';

import { Board, IResponseDefault } from '../interfaces/interfaces';

export class Api {
  static async sendBoard(data: Board): Promise<IResponseDefault> {
    const url = 'http://localhost:3333/api/board';
    try {
      const response = await axios.post(url, { board: data });
      return response.data;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
