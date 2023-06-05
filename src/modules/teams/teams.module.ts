import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { UserTeamsModule } from '@modules/user-teams/user-teams.module';

import { TeamsController } from './teams.controller';
import { Team } from './teams.entity';
import { TeamsService } from './teams.service';

@Module({
  controllers: [TeamsController],
  imports: [SequelizeModule.forFeature([Team]), UserTeamsModule],
  providers: [TeamsService],
  exports: [TeamsService],
})
export class TeamsModule {}
