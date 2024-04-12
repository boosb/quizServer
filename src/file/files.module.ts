import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Role } from "src/user/entities/role.entity";
import { User } from "src/user/entities/user.entity";
import { FilesController } from "./files.controller";
import { FilesService } from "./files.service";
import { UsersService } from "src/user/user.service";
import { QuestionService } from "src/question/question.service";
import { Question } from "src/question/entities/question.entity";
import { QuizzesService } from "src/quiz/quizzes.service";
import { Quiz } from "src/quiz/entities/quiz.entity";
import { File } from "src/file/entities/file.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([File, User, Role, Question, Quiz]),
   
  ],
  controllers: [FilesController],
  providers: [FilesService, UsersService, QuestionService, QuizzesService], // todo Поразбираться с этим вопросом, а то постоянно возникает ошибка решения зависимостей
  exports: [],
})
export class FilesModule {}