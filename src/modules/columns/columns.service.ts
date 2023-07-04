import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Column } from './columns.entity';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectModel(Column)
    private readonly columnsRepository: typeof Column,
  ) {}
}
