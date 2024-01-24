import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from '../entities/answer.entity';
import { Question } from 'src/question/entities/question.entity';

@Injectable()
export class AnswersService {
    constructor(
        @InjectRepository(Answer) private readonly answerRepository: Repository<Answer>,
        @InjectRepository(Question) private readonly questionRepository: Repository<Question>
    ) {}

    addAnswerAtQuestion() {
        
    }
}
