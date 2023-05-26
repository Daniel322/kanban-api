import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Sequelize } from 'sequelize-typescript';

import { Role } from '@common/types';

import { UserTeam } from '@modules/user-teams/user-teams.entity';
import { User } from '@modules/users/users.entity';

import { Team } from './teams.entity';
import { CreateTeamData } from './teams.types';

@Injectable()
export class TeamsService {
  constructor(
    @InjectModel(Team)
    private readonly teamsRepository: typeof Team,
  ) {}

  async getCurrentTeam(teamId: string): Promise<Team> {
    return this.teamsRepository.findByPk(teamId, {
      attributes: ['id', 'name', 'createdAt'],
    });
  }

  async getUserTeams(userId: string): Promise<Team[]> {
    return this.teamsRepository.findAll({
      attributes: [
        [
          Sequelize.fn('count', Sequelize.col('userTeams.teamId')),
          'membersCount',
        ],
        'id',
        'name',
        'createdAt',
      ],
      include: [
        {
          model: User,
          as: 'users',
          where: { id: userId },
        },
        {
          model: UserTeam,
          as: 'userTeams',
          attributes: [],
        },
      ],
      group: ['Team.id', 'userTeams.teamId'],
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
