import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@common/types';
import { Team } from '../teams.types';

export class CreatedTeamOutputDto {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public name: string;

  @ApiProperty()
  public createdAt: Date;

  @ApiProperty()
  public role: Role;

  constructor(team: Team) {
    this.id = team.id;
    this.name = team.name;
    this.createdAt = team.createdAt;
    this.role = team?.UserTeam?.role ?? team?.userTeams[0]?.role;
  }
}
