/* eslint-disable prettier/prettier */
import { ExperienceEntity } from "@entities/experience.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExperienceService } from "@services/experience.service";
import { ExperienceController } from "./experience.controller";

@Module({
    imports: [TypeOrmModule.forFeature([ExperienceEntity]),],
    controllers: [ExperienceController],
    providers: [
        ExperienceController,
        ExperienceService
    ],
    exports: [
        ExperienceController,
        ExperienceService
    ],
})
export class ExperienceModule {}