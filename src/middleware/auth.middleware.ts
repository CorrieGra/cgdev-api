/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request, NextFunction, Response } from "express";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly jwt_service: JwtService) {}

    async use(request: Request, response: Response, next: NextFunction) {
        try {
            const jwt_cookie = request.cookies['jwt'];
            const data = await this.jwt_service.verifyAsync(jwt_cookie);
            request.id = data.id;
            next();
        } catch (error) {
            throw new UnauthorizedException();
        }
    }
}