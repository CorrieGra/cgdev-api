/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
import { ExperienceEntity } from "@entities/experience.entity"
import { BadRequestException, HttpStatus, Injectable, InternalServerErrorException} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Connection, Repository } from "typeorm";

@Injectable()
export class ExperienceService {
    constructor(
        @InjectRepository(ExperienceEntity)
        private experience_repository: Repository<ExperienceEntity>,
        private readonly connection: Connection
    ) {}

    async add_experience({ experience_company, experience_company_location, experience_start_date, experience_end_date = null, experience_is_ongoing = false , experience_position, experience_technologies = null }) {
        try {
            await this.connection
                .getRepository(ExperienceEntity)
                .createQueryBuilder('experience')
                .insert()
                .into(ExperienceEntity)
                .values([
                    {
                        experience_company,
                        experience_company_location,
                        experience_start_date,
                        experience_end_date,
                        experience_position,
                        experience_technologies,
                        experience_is_ongoing
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
                message: 'Experience Added!'
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

    async get_experiences(): Promise<ExperienceEntity[]> {
        try {
            const experiences = await this.experience_repository.find();
            return experiences;
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

    async get_experience(id): Promise<ExperienceEntity> {
        try {
            const experience = await this.experience_repository.findOne({ experience_id: id });
            return experience;
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

    async end_experience({ experience_id, experience_end_date }) {
        try {
            await this.experience_repository
                .findOne({ experience_id })
                .then((experience) => {
                    experience['experience_is_ongoing'] = false;
                    experience['experience_end_date'] = experience_end_date;
                    this.experience_repository.save(experience);
                });

            return {
                status: HttpStatus.OK,
                message: `Updated experience with id: ${ experience_id }`
            }
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