import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginDto, RegisterForUserDto } from './dto/auth.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
@ApiTags('Auth')
@UseGuards(JwtAuthGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() body: RegisterForUserDto) {
    return await this.authService.register(body);
  }

  @Public()
  @Post('login')
  async login(@Body() body: LoginDto): Promise<User> {
    const user = await this.authService.login(body);
    return user;
  }
}
