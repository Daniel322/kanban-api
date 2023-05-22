import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { UserTeam } from './user-teams.entity';

@Module({
  imports: [SequelizeModule.forFeature([UserTeam])],
})
export class UserTeamsModule {}
