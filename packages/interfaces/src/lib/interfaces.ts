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
  board: number[][];
}

export interface IRequestStart {
  board: number[][];
}

export interface IResponseStart {
  id: string;
  board: number[][];
}

export interface IResponseBoard {
  board: number[][];
}
