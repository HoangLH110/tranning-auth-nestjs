import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  //id: string;
  @ApiProperty({
    //description: 'Username',
    example: 'franki110',
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    //description: 'Password',
    example: 'hoang110',
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class RegisterForUserDto {
  @ApiProperty({
    example: 'test',
  })
  name: string;

  @ApiProperty({
    example: 'admin',
  })
  role: string;

  @ApiProperty({
    example: 'test',
  })
  username: string;

  @ApiProperty({
    example: '12345',
  })
  password: string;

  @ApiProperty({
    example: 'test@gmail.com',
  })
  email: string;

  @ApiProperty({
    example: '0367847192',
  })
  phoneNumber: string;
}
