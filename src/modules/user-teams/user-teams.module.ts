import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { UserTeam } from './user-teams.entity';
import { UserTeamsService } from './user-teams.service';

@Module({
  imports: [SequelizeModule.forFeature([UserTeam])],
  providers: [UserTeamsService],
  exports: [UserTeamsService],
})
export class UserTeamsModule {}
