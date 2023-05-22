import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Team } from './teams.entity';

@Module({
  imports: [SequelizeModule.forFeature([Team])],
})
export class TeamsModule {}
