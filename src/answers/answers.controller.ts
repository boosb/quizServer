import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/createAnswer.dto';

@Controller('answers')
export class AnswersController {
    constructor(
        private answersService: AnswersService
    ) {}

   /* @Get(':id') 
    getAnswer(@Param('id') id: number) {
        return this.answersService.getAnswer(id);
    }*/

    /*@Get()
    getAnswers(@Query('questionid') questionId: number) {
        return this.answersService.getAnswers(questionId);
    }*/

    @Get()
    getAnswersAtQuiz(@Query('quizId') quizId: number) {
        return this.answersService.getAnswersAtQuiz(quizId);
    }

    @Post()
    createAnswer(@Body() createAnswerDto: CreateAnswerDto) {
        return this.answersService.createAnswer(createAnswerDto);
    }

    @Patch(':id')
    updateAnswer(@Param('id') id: number, @Body() createAnswerDto: CreateAnswerDto) {
        return this.answersService.updateAnswer(id, createAnswerDto);
    }

    @Delete(':id') 
    deleteAnswer(@Param('id') id: number) {
        return this.answersService.deleteAnswer(id);
    }
}
