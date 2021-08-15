/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
import { ProjectEntity } from "@entities/project.entity";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MulterModule } from "@nestjs/platform-express";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectService } from "@services/project.service";
import { ProjectSubscriber } from "@subscribers/project.subscriber";
import { diskStorage } from "multer";
import { ProjectController } from "./project.controller";

require('dotenv').config();

@Module({
    imports: [ 
        TypeOrmModule.forFeature([ProjectEntity]),
        MulterModule.register({
            storage: diskStorage({
                destination: `${process.env.APP_DEFAULT_UPLOAD_URL}`,
                filename: (req, file, cb) => {
                    const file_name_and_extension = /(\w*).(\w*$)/.exec(file.originalname);
                    const file_name = `${file_name_and_extension[1]}_${file.fieldname}.${file_name_and_extension[2]}`;
                    cb(null, file_name);
                }
            })
        }),
        JwtModule.register({
            secret: process.env.APP_DEFAULT_JWT_SECRET,
            signOptions: { expiresIn: '30m' }
        })
    ],
    controllers: [ProjectController],
    providers: [
        ProjectController,
        ProjectService,
        ProjectSubscriber,
    ],
    exports: [
        ProjectController,
        ProjectService,
        MulterModule,
        JwtModule
    ],
})
export class ProjectModule {}