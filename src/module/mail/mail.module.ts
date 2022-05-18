import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mail } from './entities/mail.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: `smtps://${config.get('MAIL_USER')}:${config.get(
          'MAIL_PASSWORD',
        )}@smtp.gmail.com`,
        // transport: {
        //   host: config.get('MAIL_HOST'),
        //   secure: false,
        //   auth: {
        //     user: config.get('MAIL_USER'),
        //     pass: config.get('MAIL_PASSWORD'),
        //   },
        // },
        defaults: {
          from: `"No Reply" <${config.get('MAIL_FROM')}>`,
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
