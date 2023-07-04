import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ColumnsService } from './columns.service';

@ApiTags('columns')
@Controller('columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}
}
