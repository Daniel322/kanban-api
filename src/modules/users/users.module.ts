import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { User } from './users.entity';

@Module({
  controllers: [],
  exports: [],
  imports: [SequelizeModule.forFeature([User])],
  providers: [],
})
export class UsersModule {}
