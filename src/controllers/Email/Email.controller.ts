/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from "@nestjs/common";
import { EmailService } from "@services/email.service";

@Controller('email')
export class EmailController {
    constructor(private emailService: EmailService) {}

    @Post()
    async send_email(@Body() email_details: any) {
        await this.emailService.send_email(email_details);
    }
}