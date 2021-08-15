/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
import { ProjectEntity } from "@entities/project.entity";
import { BadRequestException, HttpStatus, Injectable, InternalServerErrorException} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Connection, Repository } from "typeorm";

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(ProjectEntity)
        private project_repository: Repository<ProjectEntity>,
        private readonly connection: Connection
    ) {}

    async get_projects(): Promise<ProjectEntity[]> {
        try {
            const projects = await this.project_repository.find();
            return projects;
        } catch (error) {
            if (error.custom === undefined) {
                throw error;
            } else {
                throw new InternalServerErrorException({
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: error.message,
                });
            }
        }
    }

    async get_project(id): Promise<ProjectEntity> {
        try {
            const project = await this.project_repository.findOne({ project_id: id });
            return project;
        } catch (error) {
            if (error.custom === undefined) {
                throw error;
            } else {
                throw new InternalServerErrorException({
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: error.message,
                });
            }
        }
    }

    async add_project({ project_name, project_description, project_background, project_hero, project_slices, project_website_url, project_repo_url}) {
        try {
            await this.connection
                .getRepository(ProjectEntity)
                .createQueryBuilder('project')
                .insert()
                .into(ProjectEntity)
                .values([
                    {
                        project_name,
                        project_description,
                        project_background,
                        project_hero,
                        project_slices,
                        project_website_url,
                        project_repo_url
                    }
                ])
                .execute()
                .catch((err) => {
                    console.log(err);
                    throw new InternalServerErrorException({
                      status: HttpStatus.INTERNAL_SERVER_ERROR,
                      message: "Something went wrong, please call your database administrators."
                    });
                  });

            return {
                status: HttpStatus.CREATED,
                message: 'Project Created!'
            };
        } catch (error) {
            if (error.custom === undefined) {
                throw error;
            } else {
                throw new BadRequestException({
                  status: 400,
                  description: error.message,
                });
            }
        }
    }

    async deactivate_project(project_id: string | number | undefined | null) {
        if (typeof project_id !== 'number' && typeof project_id !== 'string') throw new InternalServerErrorException('Parameter id cannot be of type null or undefined.');

        try {
            await this.connection
                .getRepository(ProjectEntity)
                .createQueryBuilder('project')
                .update(ProjectEntity)
                .set({ project_isActive: false })
                .where("project_id = :id", { id: project_id })
                .execute()
                .catch(() => {
                    throw new InternalServerErrorException({
                        status: HttpStatus.INTERNAL_SERVER_ERROR,
                        message: "Something went wrong, please call your database administrators."
                    })
                });

            return {
                status: HttpStatus.CREATED,
                message: 'Project Created!'
            };
        } catch (error) {
            if (error.custom === undefined) {
                throw error;
            } else {
                throw new InternalServerErrorException({
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: error.message,
                });
            }
        }
    }

    async activate_project(project_id: string | number | undefined | null) {
        if (typeof project_id !== 'number' && typeof project_id !== 'string') throw new InternalServerErrorException('Parameter id cannot be of type null or undefined.');

        try {
            await this.connection
                .getRepository(ProjectEntity)
                .createQueryBuilder('project')
                .update(ProjectEntity)
                .set({ project_isActive: true })
                .where("project_id = :id", { id: project_id })
                .execute()
                .catch(() => {
                    throw new InternalServerErrorException({
                        status: HttpStatus.INTERNAL_SERVER_ERROR,
                        message: "Something went wrong, please call your database administrators."
                    })
                });

            return {
                status: HttpStatus.CREATED,
                message: 'Project Created!'
            };
        } catch (error) {
            if (error.custom === undefined) {
                throw error;
            } else {
                throw new InternalServerErrorException({
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: error.message,
                });
            }
        }
    }
}