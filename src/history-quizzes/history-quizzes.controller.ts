import { Body, Controller, Post } from '@nestjs/common';
import { HistoryQuizzesService } from './history-quizzes.service';
import { CreateHistoryQuizzesDto } from './dto/history-quizzes.dto';

@Controller('history-quizzes')
export class HistoryQuizzesController {
    constructor(
        private historyQuizzesService: HistoryQuizzesService
    ) {}

    @Post()
    createHistoryQuizzes(@Body() createHistoryQuizzesDto: CreateHistoryQuizzesDto) {
        return this.historyQuizzesService.createHistoryQuizzes(createHistoryQuizzesDto);
    }
}
