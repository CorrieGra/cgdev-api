/* eslint-disable prettier/prettier */
import { 
    Entity,
    Column,
    PrimaryColumn,
 } from 'typeorm';

 @Entity('Projects')
 export class ProjectEntity {
     @PrimaryColumn()
     project_id: number;

     @Column()
     project_name: string;

     @Column()
     project_description: string;

     @Column()
     project_background: string;

     @Column()
     project_hero: string;

     @Column()
     project_slices: '{}';

     @Column({ default: true })
     project_isActive?: boolean;

     @Column({ nullable: true })
     project_website_url: string;

     @Column({ nullable: true })
     project_repo_url: string;
 }
