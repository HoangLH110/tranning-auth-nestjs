import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

//console.log('process.env', process.env);
const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: 'mongodb://localhost:27017',
  logger: 'debug',
  subscribers: [],
  useUnifiedTopology: true,
  synchronize: true,
  useNewUrlParser: true,
  autoLoadEntities: true,
};

module.exports = typeOrmConfig;
