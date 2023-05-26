import { ApiProperty } from '@nestjs/swagger';

import { Role } from '@common/types';

import { Project } from '../projects.types';

export class CreatedProjectOutputDto {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public name: string;

  @ApiProperty()
  public creatorId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  role: Role;

  @ApiProperty()
  teamId: string | null;

  constructor(project: Project) {
    this.id = project.id;
    this.name = project.name;
    this.createdAt = project.createdAt;
    this.creatorId = project.creatorId;
    this.role = project?.UserProject?.role ?? project?.userProjects[0]?.role;
    this.teamId = project?.teamId ?? null;
  }
}
