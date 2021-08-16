/* eslint-disable prettier/prettier */
import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
 } from 'typeorm';

 @Entity('Experience')
 export class ExperienceEntity {
    @PrimaryGeneratedColumn()
    experience_id: number;

    @Column()
    experience_company: string;

    @Column()
    experience_company_location: string;

    @Column()
    experience_start_date: Date;

    @Column({ nullable: true })
    experience_end_date: Date;

    @Column({ default: false })
    experience_is_ongoing: boolean;

    @Column()
    experience_position: string;

    @Column('character varying', { nullable: true, array: true })
    experience_technologies: string[] | null;
 }
