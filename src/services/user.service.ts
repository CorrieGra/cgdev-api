/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
import { UserEntity } from "@entities/user.entity";
import { BadRequestException, HttpStatus, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Connection, Repository } from "typeorm";
import * as _ from 'lodash';

const bcrypt = require('bcrypt');

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private user_repository: Repository<UserEntity>,
    private readonly connection: Connection
  ) {}

  async register({ first_name, last_name, email, password }) {
    try {
      const user_exists = await this.connection
                            .getRepository(UserEntity)
                            .createQueryBuilder('user')
                            .where('user.user_email = :email', { email })
                            .getOne();

      if (user_exists) throw {
        message: 'The email is unavailable, please try another. If you are sure that this is your email and you can prove it, please contact us at corriegdev@gmail.com',
        status: HttpStatus.BAD_REQUEST,
        custom: true,
      }

      const hashed_password = await bcrypt.hash(password, 10).then((hash) => hash);

      if (hashed_password) {
        this.connection
        .getRepository(UserEntity)
        .createQueryBuilder('user')
        .insert()
        .into(UserEntity)
        .values([
          {
            user_firstname: first_name,
            user_lastname: last_name,
            user_email: email,
            user_password: hashed_password
          }
        ])
        .execute()
        .catch(() => {
          throw new InternalServerErrorException({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: "Something went wrong, please call your database administrators."
          })
        });

        return {
          status: HttpStatus.CREATED,
          message: 'User Created!'
        };
      } else {
          return new InternalServerErrorException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: "Something went wrong, please call your database administrators."
        });
      }

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

  async login({ email, password }) {
    try {
      const user = await this.connection
                      .getRepository(UserEntity)
                      .createQueryBuilder('user')
                      .where('user_email = :email', { email })
                      .getOne()
                      .catch(() => {
                        throw new InternalServerErrorException({
                          status: HttpStatus.INTERNAL_SERVER_ERROR,
                          message: "Something went wrong, please call your database administrators."
                        })
                      });

      const password_match = await bcrypt.compare(password, user.user_password);

      if (password_match) return _.omit(user, ['user_password', 'user_email']);

      throw new UnauthorizedException();
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
}
