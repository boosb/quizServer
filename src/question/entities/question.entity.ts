import { Answer } from "src/answers/entities/answer.entity";
import { Quiz } from "src/quiz/entities/quiz.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from "typeorm";

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @ManyToOne(() => Quiz, (quiz) => quiz.questions)
    quiz: Quiz;

    @RelationId()
    quizId: number;

    @OneToMany(() => Answer, (answer) => answer.question)
    answers: Answer[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}