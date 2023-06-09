import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Transaction } from 'sequelize';

import { CheckRoleProps } from '@common/types';

import { UserProject } from './user-projects.entity';
import { CreateUserProjectData } from './user-projects.types';

@Injectable()
export class UserProjectsService {
  constructor(
    @InjectModel(UserProject)
    private readonly userProjectRepository: typeof UserProject,
  ) {}

  async getUserRole({
    userId,
    projectId,
  }: CheckRoleProps): Promise<UserProject> {
    return this.userProjectRepository.findOne({
      where: {
        userId,
        projectId,
      },
      attributes: ['role'],
    });
  }

  async createUserProject(
    data: CreateUserProjectData,
    transaction: Transaction = null,
  ): Promise<UserProject> {
    return this.userProjectRepository.create({ ...data }, { transaction });
  }
}
