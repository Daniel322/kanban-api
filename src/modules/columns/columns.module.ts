import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { ColumnsController } from './columns.controller';
import { Column } from './columns.entity';
import { ColumnsService } from './columns.service';

@Module({
  imports: [SequelizeModule.forFeature([Column])],
  controllers: [ColumnsController],
  providers: [ColumnsService],
  exports: [ColumnsService],
})
export class ColumnsModule {}
