import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from 'src/question/entities/question.entity';
import { Answer } from './entities/answer.entity';
import { CreateAnswerDto } from './dto/createAnswer.dto';
import { QuestionService } from 'src/question/question.service';
import { QuizzesService } from 'src/quiz/quizzes.service';

@Injectable()
export class AnswersService {
    constructor(
        @InjectRepository(Answer) private readonly answerRepository: Repository<Answer>,
        private questionService: QuestionService,
        @InjectRepository(Question) private readonly questionRepository: Repository<Question>,
        private quizzesService: QuizzesService
    ) {}

    async getAnswer(answerId: number) {
        const answer = await this.answerRepository.findOne({
            where: {
                id: answerId
            }
        });

        if(!answer) {
            throw new Error('Answer not found!');
        }

        return answer;
    }

    async getAnswers(questionId: number) {
        const question = await this.questionService.getQuestion(questionId);
        return question.answers;
    }

    async getAnswersAtQuiz(quizId: number) {
        const quiz = await this.quizzesService.getQuiz(quizId)
        const answers = quiz.questions.map(question => question.answers)
        return [].concat(...answers)
    }

    async createAnswer(createAnswerDto: CreateAnswerDto) {
        const {questionId} = createAnswerDto;
        const question = await this.questionService.getQuestion(questionId);

        const answer = await this.answerRepository.save(createAnswerDto);

        question.answers.push(answer);
        this.questionRepository.save(question);

        return answer; 
    }

    async updateAnswer(answerId: number, createAnswerDto: CreateAnswerDto) {
        return await this.answerRepository.update(answerId, {
            text: createAnswerDto.text,
            isRight: createAnswerDto.isRight
        });
    }

    async deleteAnswer(answerId: number) {
        return await this.answerRepository.delete(answerId);
    }
}
