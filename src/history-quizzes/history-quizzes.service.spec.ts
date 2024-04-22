import { Test, TestingModule } from '@nestjs/testing';
import { HistoryQuizzesService } from './history-quizzes.service';

describe('HistoryQuizzesService', () => {
  let service: HistoryQuizzesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistoryQuizzesService],
    }).compile();

    service = module.get<HistoryQuizzesService>(HistoryQuizzesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
