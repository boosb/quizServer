import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/createQuestion.dto';

@Controller('question')
export class QuestionController {
    constructor(
        private questionService: QuestionService
    ) {}

    @Get(':id')
    getQuestion(@Param('id') id: number) {
        return this.questionService.getQuestion(id)
    }

    @Get()
    getQuestions(@Query('quizid') quizId: number) {
        return this.questionService.getQuestions(quizId);
    }

    @Post()
    createQuestion(@Body() createQuestionDto: CreateQuestionDto) {
        return this.questionService.createQuestion(createQuestionDto);
    }

    @Patch(':id')
    updateQuestion(@Param('id') id: number, @Body() createQuestionDto: CreateQuestionDto ) {
        return this.questionService.updateQuestion(id, createQuestionDto);
    }

    @Delete(':id')
    deleteQuestion(@Param('id') id: number) {
        return this.questionService.deleteQuestion(id);
    }
}
