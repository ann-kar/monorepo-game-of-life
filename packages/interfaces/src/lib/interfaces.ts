import { HttpStatus } from '@nestjs/common';

export interface IResponseDefault {
  statusCode: HttpStatus;
  message: string;
  error?: string;
}

export interface IRequestTick {
  id: string;
}

export interface IResponseTick {
  id: string;
  board: Board;
}

export interface IRequestStart {
  board: Board;
}

export interface IResponseStart {
  id: string;
  board: Board;
}

export interface IResponseBoard {
  board: Board;
}

export type Board = number[][];

export interface ICoordinates {
  row: number;
  col: number;
};

export interface ICell {
  isActive: boolean;
  row: number;
  col: number;
  handleCellClick: (e: ICoordinates) => void;
}