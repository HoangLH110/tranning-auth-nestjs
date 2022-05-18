import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './module/users/users.module';
import { AuthModule } from './module/auth/auth.module';
import * as typeOrmConfig from './typeorm.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleAuthModule } from './module/google-auth/google-auth.module';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './module/mail/mail.module';
import { CaslModule } from './module/casl/casl.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // no need to import into other modules
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    RouterModule.register([
      {
        path: 'api/v1/',
        module: UsersModule,
      },
    ]),
    AuthModule,
    RouterModule.register([
      {
        path: 'api/v1/',
        module: AuthModule,
      },
    ]),
    GoogleAuthModule,
    RouterModule.register([
      {
        path: '',
        module: GoogleAuthModule,
      },
    ]),
    MailModule,
    CaslModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
