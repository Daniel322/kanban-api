import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { RoleType as InviteType } from '@common/types';

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
