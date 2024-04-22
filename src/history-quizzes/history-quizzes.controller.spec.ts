import { Test, TestingModule } from '@nestjs/testing';
import { HistoryQuizzesController } from './history-quizzes.controller';

describe('HistoryQuizzesController', () => {
  let controller: HistoryQuizzesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistoryQuizzesController],
    }).compile();

    controller = module.get<HistoryQuizzesController>(HistoryQuizzesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
