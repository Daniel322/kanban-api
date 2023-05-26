import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Role } from '@common/types';
import { UserProject } from '@modules/user-projects/user-projects.entity';

import { Project } from './projects.entity';
import { CreateProjectData } from './projects.types';
import { User } from '@modules/users/users.entity';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project)
    private readonly projectsRepository: typeof Project,
  ) {}

  async getListOfUserProjects(userId: string): Promise<Project[]> {
    return this.projectsRepository.findAll({
      attributes: [
        [
          Sequelize.fn('count', Sequelize.col('userProjects.projectId')),
          'membersCount',
        ],
        'id',
        'name',
        'createdAt',
      ],
      include: [
        { model: User, as: 'creator' },
        { model: User, as: 'members', where: { id: userId } },
        { model: UserProject, as: 'userProjects', attributes: [] },
      ],
      group: ['Project.id', 'userProjects.projectId'],
    });
  }

  async getCurrentProject(projectId: string): Promise<Project> {
    return this.projectsRepository.findByPk(projectId, {
      attributes: ['id', 'name', 'createdAt'],
    });
  }

  async createProject({
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
