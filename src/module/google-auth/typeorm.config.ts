import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: 'mongodb://localhost:27017/demo_login_google',
  logger: 'debug',
  subscribers: [],
  useUnifiedTopology: true,
  synchronize: true,
  useNewUrlParser: true,
  autoLoadEntities: true,
};

module.exports = typeOrmConfig;
