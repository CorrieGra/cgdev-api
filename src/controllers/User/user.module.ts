/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
import { UserEntity } from '@entities/user.entity';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '@services/user.service';
import { UserController } from './user.controller';

require('dotenv').config();

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        JwtModule.register({
            secret: process.env.APP_DEFAULT_JWT_SECRET,
            signOptions: { expiresIn: '366days' }
        })
    ],
    controllers: [UserController],
    providers: [
        UserService,
        UserController
    ],
    exports: [
        UserService,
        UserController,
    ]
})
export class UserModule {}