import { Module } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { Quiz } from './entities/quiz.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizzesController } from './quizzes.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Quiz])
  ],
  controllers: [QuizzesController],
  providers: [QuizzesService],
  exports: [QuizzesService]
})
export class QuizzesModule {}
