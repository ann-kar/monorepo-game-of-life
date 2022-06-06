import { IsArray, IsNumber } from 'class-validator';
import { IRequestStart } from '@gol-monorepo/interfaces';

export class CreateBoardDto implements IRequestStart {
  @IsArray()
  readonly board: number[][];
}
