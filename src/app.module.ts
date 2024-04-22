import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizzesModule } from './quiz/quizzes.module';
import { QuestionModule } from './question/question.module';
import { AnswersModule } from './answers/answers.module';
import * as Joi from 'joi';
import { FilesModule } from './file/files.module';
import { HistoryQuizzesModule } from './history-quizzes/history-quizzes.module';

@Module({
  imports: [
    UserModule, 
    AuthModule, 
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        EMAIL_SERVICE: Joi.string().required(),
        EMAIL_USER: Joi.string().required(),
        EMAIL_PASSWORD: Joi.string().required(),
        
        JWT_VERIFICATION_TOKEN_SECRET: Joi.string().required(),
        JWT_VERIFICATION_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        EMAIL_CONFIRMATION_URL: Joi.string().required(),
      })
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        synchronize: true,
        entities: [__dirname + '/**/*.entity{.js, .ts}']
      }),
      inject: [ConfigService]
    }),
    QuizzesModule,
    QuestionModule,
    AnswersModule,
    FilesModule,
    HistoryQuizzesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
