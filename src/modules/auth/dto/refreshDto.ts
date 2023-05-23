import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshBodyDto {
  @ApiProperty()
  @IsString()
  readonly token: string;
}
