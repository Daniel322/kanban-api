import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Project } from './projects.entity';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';

@Module({
  controllers: [ProjectsController],
  imports: [SequelizeModule.forFeature([Project])],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
