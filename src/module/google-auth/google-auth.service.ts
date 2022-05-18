import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoogleAuth } from './entities/google-auth.entity';

@Injectable()
export class GoogleAuthService {
  constructor(
    @InjectRepository(GoogleAuth)
    private readonly userGoogleReponsitory: Repository<GoogleAuth>,
  ) {}
  async googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }
    await this.saveInfo(req.user);
    return {
      message: 'User information from google',
      user: req.user,
    };
  }

  async saveInfo(user: any) {
    return await this.userGoogleReponsitory.save(user);
  }
}
