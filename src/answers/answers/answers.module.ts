import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from '../entities/answer.entity';
import { AnswersController } from './answers.controller';
import { AnswersService } from './answers.service';
import { Question } from 'src/question/entities/question.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Answer, Question])
    ],
    controllers: [AnswersController],
    providers: [AnswersService]
})
export class AnswersModule {}
