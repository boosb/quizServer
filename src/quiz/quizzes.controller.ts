import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { CreateQuizDto } from './dto/createQuiz.dto';
import { QuizzesService } from './quizzes.service';
import { Quiz } from './entities/quiz.entity';
import { JwtAuthGuard } from 'src/auth/quards/jwt-auth.guard';

// todo пробовал использовать crud модуль, но ничего не получилось. 
// Обсуждение проблемы - https://github.com/nestjsx/crud/issues/830?ysclid=lr23i0pugn662021426
// https://github.com/nestjsx/crud/issues/830
// https://github.com/nestjsx/crud/issues/443
@Controller('quizzes')
@UseGuards(JwtAuthGuard) // todo Начать завтра от сюда, разобраться почему гуард не пропускает сразу после регистрации
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
   // @UseGuards(JwtAuthGuard)
    createQuiz(@Body() createQuizDto: CreateQuizDto) {
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
