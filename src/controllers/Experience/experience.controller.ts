/* eslint-disable prettier/prettier */
import { ExperienceEntity } from "@entities/experience.entity";
import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ExperienceService } from "@services/experience.service";

@Controller('api/experience')
export class ExperienceController {
    constructor(private readonly experience_service: ExperienceService) {}

    @Post()
    async add_experience(
        @Body('experience_company') experience_company: string,
        @Body('experience_company_location') experience_company_location: string,
        @Body('experience_start_date') experience_start_date: string,
        @Body('experience_end_date') experience_end_date: string | null,
        @Body('experience_is_ongoing') experience_is_ongoing: boolean,
        @Body('experience_position') experience_position: string,
        @Body('experience_technologies') experience_technologies: string[] | null
    ) {
        const experience_details = {
            experience_company,
            experience_company_location,
            experience_start_date,
            experience_end_date,
            experience_is_ongoing,
            experience_position,
            experience_technologies
        };

        await this.experience_service.add_experience(experience_details)
    }

    @Get()
    async get_experiences(): Promise<ExperienceEntity[]> {
        return await this.experience_service.get_experiences();
    }

    @Get(':id')
    async get_experience(@Param('id') experience_id: string): Promise<ExperienceEntity> {
        return await this.experience_service.get_experience(experience_id);
    }

    @Put('/end/:id')
    async end_experience(
        @Param('id') experience_id: string,
        @Body('experience_end_date') experience_end_date: Date
    ) {
        return await this.experience_service.end_experience({ experience_id, experience_end_date });
    }
}
