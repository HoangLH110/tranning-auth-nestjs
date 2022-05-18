import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/module/users/entities/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: User, token: string) {
    // console.log(
    //   '🚀 ~ file: mail.service.ts ~ line 10 ~ MailService ~ sendUserConfirmation ~ token',
    //   token,
    // );
    const url = `example.com/auth/confirm?token=${token}`;
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './src/module/mail/templates/confirmation',
      context: {
        name: user.name,
        url,
      },
    });
  }
}
