import { IsArray, IsUUID } from 'class-validator';
import { IRequestTick } from '@gol-monorepo/interfaces';

export class GetTickDto implements IRequestTick {
  @IsUUID()
  readonly id: string;
}
