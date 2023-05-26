import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Role } from '@common/types';
import { UserProject } from '@modules/user-projects/user-projects.entity';

import { Project } from './projects.entity';
import { CreateProjectData } from './projects.types';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project)
    private readonly projectsRepository: typeof Project,
  ) {}

  createProject({
    name,
    creatorId,
    teamId,
  }: CreateProjectData): Promise<Project> {
    //TODO: add logic for check user team role and add userProjects for all team members (only if teamId not null)
    return this.projectsRepository.create(
      {
        name,
        creatorId,
        teamId,
        userProjects: [
          {
            userId: creatorId,
            role: Role.Owner,
          },
        ],
      },
      {
        include: [UserProject],
      },
    );
  }
}
