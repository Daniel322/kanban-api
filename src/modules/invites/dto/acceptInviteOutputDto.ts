import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Role } from '@common/types';

import { UserProject } from '@modules/user-projects/user-projects.types';
import { UserTeam } from '@modules/user-teams/user-teams.types';

export class AcceptInviteOutputDto {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  role: Role;

  @ApiPropertyOptional()
  projectId: string;

  @ApiPropertyOptional()
  teamId: string;

  constructor(result: UserProject | UserTeam) {
    this.userId = result.userId;
    this.role = result.role;
    this.teamId = (result as UserTeam).teamId;
    this.projectId = (result as UserProject).projectId;
  }
}
