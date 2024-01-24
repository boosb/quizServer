import { Question } from "src/question/entities/question.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Answer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column()
    isRight: boolean;

    @ManyToOne(() => Question, (question) => question.answers)
    question: Question;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}