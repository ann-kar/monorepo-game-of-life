import { IsArray, IsNumber } from 'class-validator';

export class CreateBoardDto {
  @IsArray()
  readonly board: number[][];
}
