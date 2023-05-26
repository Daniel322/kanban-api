import { InviteType } from '@common/types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';

export class GenerateInviteLinkDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsEnum(['team', 'project'])
  @IsNotEmpty()
  type: InviteType;
}
