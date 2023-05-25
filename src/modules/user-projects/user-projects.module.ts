import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { UserProject } from './user-projects.entity';
import { UserProjectsService } from './user-projects.service';

@Module({
  imports: [SequelizeModule.forFeature([UserProject])],
  providers: [UserProjectsService],
  exports: [UserProjectsService],
})
export class UserProjectsModule {}
