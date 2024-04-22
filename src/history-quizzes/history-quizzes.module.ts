import { Module } from '@nestjs/common';
import { HistoryQuizzesService } from './history-quizzes.service';
import { HistoryQuizzesController } from './history-quizzes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryQuizzes } from './entities/history-quizzes.entity';
import { QuizzesService } from 'src/quiz/quizzes.service';
import { Quiz } from 'src/quiz/entities/quiz.entity';
import { User } from 'src/user/entities/user.entity';
import { UsersService } from 'src/user/user.service';
import { Role } from 'src/user/entities/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([HistoryQuizzes, Quiz, User, Role]), // чет стремно импортировать кучу сущностей, которые я не использую, но используются в другом модуле. Так что надо разобраться с импорто/объединением модулей
  ],
  controllers: [HistoryQuizzesController],
  providers: [HistoryQuizzesService, QuizzesService, UsersService]
})
export class HistoryQuizzesModule {}
