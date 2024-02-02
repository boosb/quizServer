import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswersController } from './answers.controller';
import { AnswersService } from './answers.service';
import { Question } from 'src/question/entities/question.entity';
import { Answer } from './entities/answer.entity';
import { QuestionService } from 'src/question/question.service';
import { QuizzesService } from 'src/quiz/quizzes.service';
import { Quiz } from 'src/quiz/entities/quiz.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Answer, Question, Quiz])
    ],
    controllers: [AnswersController],
    providers: [AnswersService, QuestionService, QuizzesService]
})
export class AnswersModule {}
