import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto, RegisterForUserDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
import { User } from '../users/entities/user.entity';
import { MailService } from 'src/module/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}
  saltOrRounds = 10;

  async generateJwtToken(payload: any) {
    return this.jwtService.sign(payload);
  }

  async checkPassword(input: string, password: string) {
    return await bcrypt.compare(input, password);
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async validateUserByToken(id: string): Promise<User> {
    const user = await this.usersService.findOne({ _id: ObjectId(id) });
    if (user) {
      return user;
    }
    return null;
  }

  async encryptionPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async register(params: RegisterForUserDto) {
    const userName = await this.usersService.findOne({
      username: params.username,
    });
    if (userName) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: 'UserName already exist',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const phoneNumber = await this.usersService.findOne({
      phoneNumber: params.phoneNumber,
    });
    if (phoneNumber) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: 'PhoneNumber already exist',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const emailUser = await this.usersService.findOne({
      email: params.email,
    });
    if (emailUser) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: 'Email already exist',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    params.password = await this.encryptionPassword(params.password);
    const result: any = await this.usersService.createUser(params);

    result.id = result.id.toString();
    return result;
  }

  async login(params: LoginDto) {
    const currentUser: any = await this.usersService.findOne({
      username: params.username,
    });

    if (!currentUser) {
      throw new UnprocessableEntityException(`User don't exits`);
    }
    const passwordValid = await this.checkPassword(
      params.password,
      currentUser.password,
    );

    if (!passwordValid) {
      throw new UnprocessableEntityException('Password failed');
    }

    const payload = {
      _id: currentUser._id,
    };

    const accessToken = await this.generateJwtToken(payload);

    currentUser.accessToken = accessToken;
    const token = Math.floor(1000 + Math.random() * 9000).toString();
    await this.mailService.sendUserConfirmation(currentUser, token);
    //console.log(currentUser.email);

    return currentUser;
  }
}
