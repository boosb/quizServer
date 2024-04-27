import { Body, Controller, Get, Post } from '@nestjs/common';
import { HistoryQuizzesService } from './history-quizzes.service';
import { CreateHistoryQuizzesDto } from './dto/history-quizzes.dto';

@Controller('history-quizzes')
export class HistoryQuizzesController {
    constructor(
        private historyQuizzesService: HistoryQuizzesService
    ) {}

    @Get()
    getHistoryQuizzesAll() {
        return this.historyQuizzesService.getHistoryQuizzesAll();
    }

    @Post()
    createHistoryQuizzes(@Body() createHistoryQuizzesDto: CreateHistoryQuizzesDto) {
        return this.historyQuizzesService.createHistoryQuizzes(createHistoryQuizzesDto);
    }
}
