import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    name: 'name',
    example: 'Cristiano Ronaldo',
  })
  name: string;
  @ApiProperty({
    name: 'username',
    example: 'Cristiano',
  })
  username: string;
  @ApiProperty({
    name: 'role',
    example: '',
  })
  role: string;
  @ApiProperty({
    name: 'phoneNumber',
    example: '0123456789',
  })
  phoneNumber: string;
  @ApiProperty({
    name: 'email',
    example: 'cr7@email.com',
  })
  email: string;
  @ApiProperty({
    name: 'password',
  })
  password: string;
}
