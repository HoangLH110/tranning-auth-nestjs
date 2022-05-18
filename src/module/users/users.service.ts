import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class UsersService {
  save: any;
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async paginate(options: IPaginationOptions): Promise<Pagination<User>> {
    return paginate<User>(this.userRepository, options);
  }

  async createUser(createUser: any) {
    const creataUser = this.userRepository.create(createUser);
    return await this.userRepository.save(creataUser);
  }

  async findAll(query: any) {
    const { limit, page } = query;

    const Query = {};

    const data = await this.userRepository.find({
      where: Query,
      skip: Number(page) * Number(limit),
      take: Number(limit),
    });
    const count = await this.userRepository.count(Query);

    const total_page = Math.ceil(count / limit);

    return {
      total_page: total_page,
      limit: Number(limit),
      current_page: Number(page),
      data: data,
    };
  }

  async findOne(query: any): Promise<User> {
    const user = await this.userRepository.findOne({ where: query });
    if (user) {
      user.username = user.username;
      return user;
    }
    return null;
  }

  async findEmail(query: any): Promise<User> {
    const user = await this.userRepository.findOne({ where: query });
    if (user) {
      user.email = user.email;
      return user;
    }
    return null;
  }

  async findPhoneNumber(phoneNumber: string) {
    return this.userRepository.findOne(phoneNumber);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updateAt = new Date();
    updateUserDto.updated_at = updateAt;
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: string) {
    return this.userRepository.delete(id);
  }
}
