/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
import { ExperienceModule } from '@controllers/Experience/experience.module';
import { ProjectModule } from '@controllers/Project/project.module';
import { UserModule } from '@controllers/User/user.module';
import { ExperienceEntity } from '@entities/experience.entity';
import { ProjectEntity } from '@entities/project.entity';
import { UserEntity } from '@entities/user.entity';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AuthMiddleware } from './middleware/auth.middleware';

require('dotenv').config();

@Module({
  imports: [
    UserModule,
    ProjectModule,
    ExperienceModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [
        UserEntity,
        ProjectEntity,
        ExperienceEntity
      ],
      synchronize: true,
      schema: process.env.POSTGRES_SCHEMA,
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  constructor(private connection: Connection) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'api/projects', method: RequestMethod.POST }, { path: 'api/experience', method: RequestMethod.POST });
  }
}
