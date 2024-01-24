import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateQuizDto } from './dto/createQuiz.dto';
import { QuizzesService } from './quizzes.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { Quiz } from './entities/quiz.entity';

// todo пробовал использовать crud модуль, но ничего не получилось. 
// Обсуждение проблемы - https://github.com/nestjsx/crud/issues/830?ysclid=lr23i0pugn662021426
// https://github.com/nestjsx/crud/issues/830
// https://github.com/nestjsx/crud/issues/443
@Controller('quizzes')
export class QuizzesController {
    constructor(
        private quizzesService: QuizzesService
    ) {}

    @Get()
    getQuizzes() {
        return this.quizzesService.getQuizzes();
    }

    @Get(':id')
    getQuiz(@Param('id') id: number) {
        return this.quizzesService.getQuiz(id);
    }

    @Post()
    create(@Body() createQuizDto: CreateQuizDto) {
        return this.quizzesService.createQuiz(createQuizDto);
    }

    @Patch(':id')
    updateQuiz(@Param('id') id: number, @Body() createQuizDto: CreateQuizDto) {
        return this.quizzesService.updateQuiz(id, createQuizDto);
    }

    @Delete(':id')
    deleteQuiz(@Param('id') id: number ) {
        return this.quizzesService.deleteQuiz(id);
    }
}
