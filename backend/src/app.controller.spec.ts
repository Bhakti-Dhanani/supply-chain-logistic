import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return the welcome message', () => {
      expect(appController.getHello()).toBe('Welcome to the Supply Chain Logistics Management System!');
    });
  });

  describe('health', () => {
    it('should return application health status', () => {
      expect(appController.getHealth()).toEqual({ status: 'OK' });
    });
  });
});
