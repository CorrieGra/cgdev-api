/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
import { MailerService } from '@nestjs-modules/mailer';
import { HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';

require('dotenv').config();

interface IEmail {
    client_email: string;
    client_name: string;
    client_message: string;
}


@Injectable()
export class EmailService {
    constructor(private mailerService: MailerService) {}

    async send_email(email_details: IEmail) {
        try {
            const result = await this.mailerService.sendMail({
                to: process.env.EMAIL_TO,
                subject: 'I might want to work with you !',
                template: './contact',
                context: {
                    name: email_details.client_name,
                    message: email_details.client_message,
                    email: email_details.client_email
                }
            })
            .catch((error) => {
                return new InternalServerErrorException({
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: error,
                });
            });

            return HttpStatus.OK;
        } catch (error) {
            if (error.custom !== undefined) {
                return error;
            } else {
                return new InternalServerErrorException();
            }
        }
    }
}