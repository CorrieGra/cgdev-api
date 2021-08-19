/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { join } from "path";
import { EmailController } from "./Email.controller";
import { EmailService } from '@services/email.service';


require('dotenv').config();

@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                host: 'smtp.gmail.com',
                port: 465,
                ignoreTls: false,
                secure: true,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASSWORD
                }
            },
            defaults: {
                from: "CGDev Website <noreply@cgdev.com>"
            },
            template: {
                dir: join(__dirname, 'templates'),
                adapter: new HandlebarsAdapter(),
                options: {
                    strict: true
                }
            }
        })
    ],
    controllers: [EmailController],
    providers: [
        EmailController,
        EmailService
    ],
    exports: [
        EmailController,
        EmailService
    ],
})
export class EmailModule {}