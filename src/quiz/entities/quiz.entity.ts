import { HistoryQuizzes } from "src/history-quizzes/entities/history-quizzes.entity";
import { Question } from "src/question/entities/question.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Quiz {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    complexity: number;

    @OneToMany(() => Question, (question) => question.quiz)
    questions: Question[];

    @OneToMany(() => HistoryQuizzes, (historyQuizzes) => historyQuizzes.quiz)
    historyQuizzes: HistoryQuizzes[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}