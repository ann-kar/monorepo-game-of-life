import { HttpStatus } from '@nestjs/common';

export type Board = (0 | 1)[][];

export type Coordinates = {
  row: number;
  col: number;
};

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

export interface ICell {
  isActive: boolean;
  row: number;
  col: number;
  handleCellClick: (e: Coordinates) => void;
}
