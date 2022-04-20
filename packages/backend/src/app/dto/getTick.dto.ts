import { IsArray, IsUUID } from 'class-validator';

export class GetTickDto {
  @IsUUID()
  readonly id: string;
}
