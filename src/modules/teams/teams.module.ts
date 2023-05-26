import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { TeamsController } from './teams.controller';
import { Team } from './teams.entity';
import { TeamsService } from './teams.service';

@Module({
  controllers: [TeamsController],
  imports: [SequelizeModule.forFeature([Team])],
  providers: [TeamsService],
  exports: [TeamsService],
})
export class TeamsModule {}
