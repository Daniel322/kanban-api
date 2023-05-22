import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Project } from './projects.entity';

@Module({
  imports: [SequelizeModule.forFeature([Project])],
})
export class ProjectsModule {}
