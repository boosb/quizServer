import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from './dto/createQuestion.dto';
import { Quiz } from 'src/quiz/entities/quiz.entity';
import { QuizzesService } from 'src/quiz/quizzes.service';

@Injectable()
export class QuestionService {
    constructor(
        @InjectRepository(Question) private readonly questionRepository: Repository<Question>,
        private quizzesService: QuizzesService,
        @InjectRepository(Quiz) private readonly quizRepository: Repository<Quiz>
    ) {}

    async getQuestionsAtQuiz(quizId: number) {
        const quiz = await this.quizzesService.getQuiz(quizId);
        return quiz.questions;
    }

    async getQuestion(quizId: number, questionId: number) {
        const question = await this.questionRepository.findOne({
            where: {
                id: questionId,
                quizId: quizId
            },
            relations: ['answers']
        });

        if(!question) {
            throw new Error('Answer not found!');
        }

        return 
    }

    async addQuestionAtQuiz(quizId: number, createQuestionDto: CreateQuestionDto) {
        const quiz = await this.quizzesService.getQuiz(quizId);

        const question = await this.questionRepository.save({
            text: createQuestionDto.text
        });

        quiz.questions.push(question);

        return this.quizRepository.save(quiz);
    }
}
