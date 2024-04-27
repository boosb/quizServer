import { IHistoryQuizzes } from "src/types/history-quizzes";

export class CreateHistoryQuizzesDto {
    history: IHistoryQuizzes;
    dateTime: Date;
    quizId: number;
    userId: number;
}