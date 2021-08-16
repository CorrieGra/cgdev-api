/* eslint-disable prettier/prettier */
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
} from 'typeorm';

@Entity('Users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column()
    user_firstname: string;

    @Column()
    user_lastname: string;

    @Column({ nullable: true })
    user_username?: string;

    @Column()
    user_email: string;

    @Column()
    user_password: string;
}
