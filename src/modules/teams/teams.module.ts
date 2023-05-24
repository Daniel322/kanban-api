import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Team } from './teams.entity';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';

@Module({
  controllers: [TeamsController],
  imports: [SequelizeModule.forFeature([Team])],
  providers: [TeamsService],
  exports: [TeamsService],
})
export class TeamsModule {}
