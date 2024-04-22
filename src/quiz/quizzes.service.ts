import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/createQuiz.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuizzesService {
    constructor(
        @InjectRepository(Quiz) private readonly quizRepository: Repository<Quiz>
    ) {}

    async createQuiz(createQuizDto: CreateQuizDto) {
        const existQuiz = await this.quizRepository.findOne({
            where: {
              name: createQuizDto.name
            }
        });

        if(existQuiz) {
            throw new BadRequestException('A quiz with the same name already exists!');
        }

        const quiz = await this.quizRepository.save({
            name: createQuizDto.name,
            complexity: createQuizDto.complexity
        });

        return quiz;
    }

    async getQuizzes() {
        return await this.quizRepository.find({
            relations: {
                questions: {
                    answers: true
                }
            }
        });
    }

    async getQuiz(id: number) {
        const quiz = await this.quizRepository.findOne({
            where: {id},
            relations: {
                questions: {
                    answers: true
                },
                historyQuizzes: {}
            }
        });

        if(!quiz) {
            throw new Error('Quiz not found!');
        }

        return quiz;
    }

    async updateQuiz(id: number, createQuizDto: CreateQuizDto) {
        return await this.quizRepository.update(id, createQuizDto);
    }

    async deleteQuiz(id: number) {
        return await this.quizRepository.delete(id);
    }
}
