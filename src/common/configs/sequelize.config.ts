import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModuleAsyncOptions } from '@nestjs/sequelize';

import { Project } from '@modules/projects/projects.entity';
import { Team } from '@modules/teams/teams.entity';
import { User } from '@modules/users/users.entity';
import { UserProject } from '@modules/user-projects/user-projects.entity';
import { UserTeam } from '@modules/user-teams/user-teams.entity';

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
    models: [Project, Team, User, UserProject, UserTeam],
  }),
};
