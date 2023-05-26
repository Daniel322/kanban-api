import { ApiProperty } from '@nestjs/swagger';

import { Team } from '@modules/teams/teams.types';
import { CreatedTeamOutputDto } from '@modules/teams/dto';

import { UserWithIncludes } from '../users.types';
import { CreatedProjectOutputDto } from '@modules/projects/dto';
import { Project } from '@modules/projects/projects.types';

export class UserOutputDto {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public email: string;

  @ApiProperty()
  public fullName: string;

  @ApiProperty()
  public firstName: string;

  @ApiProperty()
  public lastName: string;

  @ApiProperty()
  public teams: CreatedTeamOutputDto[];

  @ApiProperty()
  public projects: CreatedProjectOutputDto[];

  constructor(user: UserWithIncludes) {
    this.id = user.id;
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.fullName = user.fullName;
    this.teams = user.teams.map((team: Team) => new CreatedTeamOutputDto(team));
    this.projects = user.projects.map(
      (project: Project) => new CreatedProjectOutputDto(project),
    );
  }
}
