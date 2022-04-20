import { HttpStatus } from '@nestjs/common';

export type Board = number[][];

export interface IResponseDefault {
  statusCode: HttpStatus;
  message: string;
  error?: string;
}

export interface IResponse {
  board: Board;
  id: string;
  updatedAt: string;
}
