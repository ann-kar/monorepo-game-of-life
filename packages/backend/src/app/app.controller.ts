import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';

import { AppService } from './app.service';
import { CreateBoardDto } from './dto/createBoard.dto';
import { GetTickDto } from './dto/getTick.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('board/:size')
  generateBoard(@Param() param: { size: string }) {
    return this.appService.generateBoard(param);
  }

  @Post('board')
  createBoard(@Body() createBoardDto: CreateBoardDto) {
    return this.appService.createBoard(createBoardDto);
  }

  @Post('tick')
  getTick(@Body() getTickDto: GetTickDto) {
    const res = this.appService.getTick(getTickDto);
    if (!res) {
      throw new HttpException('Board not found', HttpStatus.NOT_FOUND);
    } else {
      return res;
    }
  }
}
