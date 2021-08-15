/* eslint-disable prettier/prettier */
import { 
  Body,
  Controller,
  Post,  
  Res,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@services/user.service';
import { Response } from 'express';
import * as _ from 'lodash';

@Controller('api/user')
export class UserController {
  constructor(private readonly user_service: UserService, private jwt_service: JwtService) {}

  @Post('register')
  async register(
    @Res({ passthrough: true }) response: Response,
    @Body('first_name') first_name: string,
    @Body('last_name') last_name: string,
    @Body('email') email: string,
    @Body('password') password: string
  ) {
    return await this.user_service.register({ first_name, last_name, email, password });
  }

  @Post('login')
  async login(
    @Res({ passthrough: true }) response: Response,
    @Body('email') email: string,
    @Body('password') password: string
  ) {
    const user = await this.user_service.login({ email, password });
    const jwt = await this.jwt_service.signAsync({ id: user.user_id });

    response.cookie('jwt', jwt, { httpOnly: true });

    return _.omit(user, ['user_id']);
  }
}
