import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Entity, UpdateDateColumn } from 'typeorm';
import { Role } from '../entities/user.entity';
import { CreateUserDto } from './create-user.dto';

@Entity('user')
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @ApiProperty({
    description: 'name',
    example: 'Cristiano',
  })
  name: string;
  @ApiProperty({
    description: 'username',
    example: 'cr7',
  })
  username: string;
  @ApiProperty({
    description: 'phoneNumber',
    example: '0123456789',
  })
  phoneNumber: string;
  @ApiProperty({
    description: 'Email',
    example: 'example@just.engineer.com',
  })
  email: string;
  @ApiProperty({
    name: 'role',
    example: '',
  })
  role: Role;
  @ApiProperty({
    description: 'password',
    example: 'cristianoronaldo',
  })
  password?: string;
}
