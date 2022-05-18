import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MailService } from './mail.service';
import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('email')
@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}
}
