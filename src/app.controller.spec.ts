import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return the root response', () => {
      expect(appController.getRoot()).toMatchObject({
        status: 'ok',
        message: 'API is running 🚀',
        uptime: expect.any(Number),
        timestamp: expect.any(String),
      });
    });
  });
});
