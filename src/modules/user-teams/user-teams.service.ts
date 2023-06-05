import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Transaction } from 'sequelize';

import { CheckRoleProps } from '@common/types';

import { UserTeam as IUserTeam } from './user-teams.types';
import { UserTeam } from './user-teams.entity';

@Injectable()
export class UserTeamsService {
  constructor(
    @InjectModel(UserTeam)
    private readonly userTeamsRepository: typeof UserTeam,
  ) {}

  async getUserRole({ userId, teamId }: CheckRoleProps): Promise<UserTeam> {
    return this.userTeamsRepository.findOne({
      where: {
        userId,
        teamId,
      },
      attributes: ['role'],
    });
  }

  async createUserTeam(
    data: IUserTeam,
    transaction: Transaction = null,
  ): Promise<UserTeam> {
    return this.userTeamsRepository.create({ ...data }, { transaction });
  }
}
