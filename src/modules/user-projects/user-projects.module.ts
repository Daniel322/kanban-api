import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { UserProject } from './user-projects.entity';

@Module({
  imports: [SequelizeModule.forFeature([UserProject])],
})
export class UserProjectsModule {}
