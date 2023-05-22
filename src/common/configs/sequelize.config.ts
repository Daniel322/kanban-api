import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModuleAsyncOptions } from '@nestjs/sequelize';

export const SequelizeConfig: SequelizeModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    dialect: 'mysql',
    host: configService.get('config.dbHost'),
    port: configService.get('config.dbPort'),
    username: configService.get('config.dbUsername'),
    database: configService.get('config.dbName'),
    password: configService.get('config.dbPassword'),
    models: [],
  }),
};
