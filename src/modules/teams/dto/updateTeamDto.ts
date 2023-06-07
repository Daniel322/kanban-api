import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateTeamDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name: string;
}
