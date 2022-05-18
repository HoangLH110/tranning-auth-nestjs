import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PoliciesGuard } from '../auth/guards/policies.guard';
import { CheckPolicies } from 'src/decorators/polices.decorator';

import { User } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Action, AppAbility } from '../casl/casl-ability.factory';
import { LocalAuthGuard } from '../auth/guards/local.guard';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
// @UseGuards(JwtAuthGuard)
// @UseGuards(PoliciesGuard)
@ApiTags('Users')
export class UsersController {
  [x: string]: any;
  constructor(private readonly usersService: UsersService) {}
  @Get()
  // @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, User))
  @ApiQuery({
    required: true,
    name: 'limit',
    explode: true,
    example: 2,
  })
  @ApiQuery({
    required: true,
    name: 'page',
    explode: true,
    example: 1,
  })
  @ApiBearerAuth()
  findAll(@Query() query: any) {
    return this, this.usersService.findAll(query);
  }

  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, User))
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, User))
  @ApiBearerAuth()
  @Get('email')
  findEmail(@Param('email') email: string) {
    return this.usersService.findOne(email);
  }

  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, User))
  @ApiBearerAuth()
  @Get('phoneNumber')
  findPhoneNumber(@Param('phoneNumber') phoneNumber: string) {
    return this.usersService.findOne(phoneNumber);
  }

  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, User))
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @CheckPolicies((ability: AppAbility) => ability.can(Action.Manage, User))
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
