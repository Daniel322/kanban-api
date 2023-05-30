import { ApiProperty } from '@nestjs/swagger';

import { InviteType } from '@common/types';

import { InviteObject } from '../invites.types';

export class CheckInviteTokenOutputDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  type: InviteType;

  constructor(inviteObject: InviteObject) {
    this.id = inviteObject.id;
    this.name = inviteObject.name;
    this.createdAt = inviteObject.createdAt;
    this.type = inviteObject.type;
  }
}
