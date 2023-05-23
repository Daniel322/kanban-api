import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { SharedModule } from '@common/shared/shared.module';

import { User } from './users.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  exports: [UsersService],
  imports: [SequelizeModule.forFeature([User]), SharedModule],
  providers: [UsersService],
})
export class UsersModule {}
