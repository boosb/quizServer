import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, RelationId, JoinColumn, ManyToOne } from 'typeorm';
import { Role } from './role.entity';

@Entity() // todo ваще мне кажется, что хорошо было бы связать User and Role -> UserRole
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    /*@OneToOne(() => Role)
    @JoinColumn()
    role: Role;

    @Column()
    roleId: number;*/

    @ManyToOne(() => Role, (role) => role.users)
    @JoinColumn()
    role: Role;

    @Column() // todo оставлю пометку, чтоб не забыть. Долго не понимал почему поле не сохраняется, проблема оказалась в декораторе RelationId
    roleId: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}