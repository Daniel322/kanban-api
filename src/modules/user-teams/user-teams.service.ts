import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Transaction } from 'sequelize';

import { UserTeam as IUserTeam } from './user-teams.types';
import { UserTeam } from './user-teams.entity';

@Injectable()
export class UserTeamsService {
  constructor(
    @InjectModel(UserTeam)
    private readonly userTeamsRepository: typeof UserTeam,
  ) {}

  async createUserTeam(
    data: IUserTeam,
    transaction: Transaction = null,
  ): Promise<UserTeam> {
    return this.userTeamsRepository.create({ ...data }, { transaction });
  }
}
