import { Question } from "src/question/entities/question.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from "typeorm";

@Entity()
export class Answer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column()
    isRight: boolean;

    @ManyToOne(
        () => Question, 
        (question) => question.answers,         
        {onDelete: 'CASCADE'}
    )
    question: Question;

    @RelationId((answer: Answer) => answer.question)
    questionId: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}