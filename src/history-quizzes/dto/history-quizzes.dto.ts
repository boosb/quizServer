import { IHistoryQuizzes } from "../entities/history-quizzes.entity";

export class CreateHistoryQuizzesDto {
    history: IHistoryQuizzes;
    dateTime: Date;
    quizId: number;
    userId: number;
}