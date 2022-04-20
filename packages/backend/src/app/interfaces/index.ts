import { HttpStatus } from '@nestjs/common';

export interface IResponseDefault {
  statusCode: HttpStatus;
  message: string;
  error?: string;
}
