import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      })
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/board (POST)', () => {
    it('should return created board with id', async () => {
      const length = 5;
      const board = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ];
      const response = await request(app.getHttpServer())
        .post('/board')
        .send({ board: board })
        .expect('Content-Type', /json/)
        .expect(201);
      expect(response.body.board).toHaveLength(length);
      response.body.board.forEach((element) => {
        expect(element).toHaveLength(length);
      });
      expect(response.body.id).toEqual(expect.any(String));
    });
  });

  describe('/tick (POST)', () => {
    it('should return board after tick', async () => {
      const board = [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 0, 0, 1, 1],
        [0, 0, 0, 1, 0],
      ];
      const boardAfterTick = [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 1, 1, 1],
        [0, 0, 0, 1, 1],
      ];
      const res = await request(app.getHttpServer())
        .post('/board')
        .send({ board: board })
        .expect('Content-Type', /json/)
        .expect(201);
      const response = await request(app.getHttpServer())
        .post('/tick')
        .send({ id: res.body.id })
        .expect('Content-Type', /json/)
        .expect(201);
      expect(response.body.board).toEqual(boardAfterTick);
      expect(response.body.id).toEqual(res.body.id);
    });

    it('should return board after tick with multiple boards in database', async () => {
      const board = [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 0, 0, 1, 1],
        [0, 0, 0, 1, 0],
      ];
      const boardAfterTick = [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 1, 1, 1],
        [0, 0, 0, 1, 1],
      ];
      const res = await request(app.getHttpServer())
        .post('/board')
        .send({ board: board })
        .expect('Content-Type', /json/)
        .expect(201);
      await request(app.getHttpServer())
        .post('/board')
        .send({ board: board })
        .expect('Content-Type', /json/)
        .expect(201);
      const response = await request(app.getHttpServer())
        .post('/tick')
        .send({ id: res.body.id })
        .expect('Content-Type', /json/)
        .expect(201);
      expect(response.body.board).toEqual(boardAfterTick);
      expect(response.body.id).toEqual(res.body.id);
    });

    it('should throw error when id not found', async () => {
      const response = await request(app.getHttpServer())
        .post('/tick')
        .send({ id: '78361006-8338-433a-a5ed-53b0d6e8e32a' })
        .expect('Content-Type', /json/)
        .expect(404);
      expect(response.body).toEqual({
        statusCode: 404,
        message: 'Board not found',
      });
    });

    it('should throw error when id is empty', async () => {
      const response = await request(app.getHttpServer())
        .post('/tick')
        .set('Content-Type', 'application/json')
        .send({ id: '' })
        .expect('Content-Type', /json/)
        .expect(400);
      expect(response.body).toEqual({
        statusCode: 400,
        message: ['id must be a UUID'],
        error: 'Bad Request',
      });
    });
  });
});
