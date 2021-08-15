/* eslint-disable prettier/prettier */
import { ProjectEntity } from "@entities/project.entity";
import { Body, Controller, Get, Param, Post, Put, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { ProjectService } from "@services/project.service";

@Controller('api/project')
export class ProjectController {
    constructor(private readonly project_service: ProjectService) {}

    @Get()
    async get_projects(): Promise<ProjectEntity[]> {
        return await this.project_service.get_projects();
    }

    @Get(':id')
    async get_project(@Param('id') project_id: string): Promise<ProjectEntity> {
        return await this.project_service.get_project(project_id);
    }
    
    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        {
            name: 'project_hero',
            maxCount: 1,
        },
        {
            name: 'project_slice_1',
            maxCount: 1,
        },
        {
            name: 'project_slice_2',
            maxCount: 1,
        }
    ]))
    async add_project(
        @UploadedFiles() files: Express.Multer.File[],
        @Body('project_name') project_name: string,
        @Body('project_description') project_description: string,
        @Body('project_background') project_background: string,
        @Body('project_website_url') project_website_url: string,
        @Body('project_repo_url') project_repo_url: string
        ) {
            const project_hero = `https://dev-test.org.za/${files['project_hero'][0].path.replace('\\', '/')}`;
            const project_slices = JSON.stringify({
               project_slice_1: `https://dev-test.org.za/${files['project_slice_1'][0].path.replace('\\', '/')}`,
               project_slice_2: `https://dev-test.org.za/${files['project_slice_2'][0].path.replace('\\', '/')}`, 
            });
            
            const project_details = {
                project_name,
                project_description,
                project_background,
                project_hero,
                project_slices,
                project_website_url,
                project_repo_url,
            };
            
        await this.project_service.add_project(project_details);
    }

    @Put('deactivate/:id')
    async deactivate_project(@Param('id') project_id: string) {
        await this.project_service.deactivate_project(project_id);
    }

    @Put('activate/:id')
    async activate_project(@Param('id') project_id: string) {
        await this.project_service.activate_project(project_id);
    }
}