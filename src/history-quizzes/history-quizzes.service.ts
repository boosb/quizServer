import { Injectable } from '@nestjs/common';
import { CreateHistoryQuizzesDto } from './dto/history-quizzes.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HistoryQuizzes } from './entities/history-quizzes.entity';
import { Repository } from 'typeorm';
import { Quiz } from 'src/quiz/entities/quiz.entity';
import { QuizzesService } from 'src/quiz/quizzes.service';
import { UsersService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class HistoryQuizzesService {
    constructor(
        private quizzesService: QuizzesService,
        private usersService: UsersService,
        @InjectRepository(HistoryQuizzes) private readonly historyQuizzesRepository: Repository<HistoryQuizzes>,
        @InjectRepository(Quiz) private readonly quizRepository: Repository<Quiz>,
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {}

    async getHistoryQuizzesAll() {
        return await this.historyQuizzesRepository.find({
            relations: {
                quiz: true,
                user: true
            }
        });
    }

    async createHistoryQuizzes(createHistoryQuizzesDto: CreateHistoryQuizzesDto) {
        const {history, quizId, userId} = createHistoryQuizzesDto;
        const historyQuizzes = await this.historyQuizzesRepository.save({
            history,
            dateTime: new Date(),
            quizId,
            userId
        });

        this._addHistoryQuizzesAtQuiz(quizId, historyQuizzes);
        this._addHistoryQuizzesAtUser(userId, historyQuizzes);
        
        return historyQuizzes;
    }

    async _addHistoryQuizzesAtQuiz(quizId: number, historyQuizzes: HistoryQuizzes) {
        const quiz = await this.quizzesService.getQuiz(quizId);
        quiz.historyQuizzes.push(historyQuizzes);
        this.quizRepository.save(quiz);
    }

    async _addHistoryQuizzesAtUser(userId: number, historyQuizzes: HistoryQuizzes) {
        const user = await this.usersService.getUserById(userId);
        user.historyQuizzes.push(historyQuizzes);
        this.userRepository.save(user);
    }
}
