import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/createQuestion.dto';
import { QuizzesService } from 'src/quiz/quizzes.service';

@Controller('question')
export class QuestionController {
    constructor(
        private questionService: QuestionService
    ) {}

    @Get('quiz/:id')
    getAtQuiz(@Param('id') id: number) {
        return this.questionService.getQuestionsAtQuiz(id);
    }

    @Post('quiz/:id')
    createAtQuiz(@Param('id') id: number, @Body() createQuestionDto: CreateQuestionDto) {
        return this.questionService.addQuestionAtQuiz(id, createQuestionDto);
    }
}
