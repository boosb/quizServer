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

    async getQuestions(quizId: number) {
        const quiz = await this.quizzesService.getQuiz(quizId);
        return quiz.questions;
    }

    async getQuestion(questionId: number) {
        const question = await this.questionRepository.findOne({
            where: {
                id: questionId
            },
            relations: ['answers']
        });

        if(!question) {
            throw new Error('Question not found!');
        }

        return question;
    }

    async createQuestion(createQuestionDto: CreateQuestionDto) {
        const quiz = await this.quizzesService.getQuiz(createQuestionDto.quizId);

        const question = await this.questionRepository.save({
            text: createQuestionDto.text
        });

        quiz.questions.push(question);
        this.quizRepository.save(quiz);

        return question; 
    }

    async updateQuestion(questionId: number, createQuestionDto: CreateQuestionDto) {
        return await this.questionRepository.update(questionId, createQuestionDto);
    }

    async deleteQuestion(questionId: number) {
        return await this.questionRepository.delete(questionId);
    }
}
