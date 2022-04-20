import { Test } from '@nestjs/testing';

import { AppService } from './app.service';

describe.skip('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('getData', () => {
    // it('should return new game board', () => {
    //   const bo = service.createBoard({ size: 5 });
    //   expect(bo.board).toHaveLength(5);
    //   bo.board.forEach((element) => {
    //     expect(element).toHaveLength(5);
    //   });
    // });
  });
});
