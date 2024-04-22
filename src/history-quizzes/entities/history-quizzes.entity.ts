import { Quiz } from "src/quiz/entities/quiz.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from "typeorm";

export interface IHistoryQuizzes {
    [key:number]: number
}

@Entity()
export class HistoryQuizzes {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'json' })
    history: IHistoryQuizzes;

    /*@Column({nullable: true})
    img: string | null;*/

    @Column({ type: 'timestamptz' }) // Recommended
    dateTime: Date;

    @ManyToOne(() => Quiz, (quiz) => quiz.historyQuizzes)
    @JoinColumn()
    quiz: Quiz;

    @RelationId((historyQuizzes: HistoryQuizzes) => historyQuizzes.quiz)
    quizId: number;

    @ManyToOne(() => User, (user) => user.historyQuizzes, { onDelete: "CASCADE" })
    @JoinColumn()
    user: User;

    @RelationId((historyQuizzes: HistoryQuizzes) => historyQuizzes.user)
    userId: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}