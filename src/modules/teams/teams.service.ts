import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Sequelize } from 'sequelize-typescript';

import { Role } from '@common/types';

import { Team } from './teams.entity';
import { CreateTeamData } from './teams.types';
import { UserTeam } from '@modules/user-teams/user-teams.entity';
import { User } from '@modules/users/users.entity';

@Injectable()
export class TeamsService {
  constructor(
    @InjectModel(Team)
    private readonly teamsRepository: typeof Team,
  ) {}

  async getUserTeams(userId: string): Promise<Team[]> {
    return this.teamsRepository.findAll({
      include: [
        {
          model: User,
          as: 'users',
          where: { id: userId },
        },
      ],
    });
  }

  async createTeam(data: CreateTeamData): Promise<Team> {
    return this.teamsRepository.create(
      {
        name: data.name,
        userTeams: [
          {
            userId: data.userId,
            role: Role.Owner,
          },
        ],
      },
      {
        include: [UserTeam],
      },
    );
  }
}
