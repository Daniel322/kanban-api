import { ApiProperty } from '@nestjs/swagger';

import { Member } from '@common/types';
import { CreatedUserOutputDto } from '@modules/users/dto';
import { Project } from '../projects.types';

export class MyProjectsOutputDto {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public name: string;

  @ApiProperty()
  public createdAt: Date;

  @ApiProperty()
  public creator: CreatedUserOutputDto;

  @ApiProperty()
  public membersCount: number;

  @ApiProperty()
  public members: Member[];

  constructor(project: Project) {
    this.id = project.id;
    this.name = project.name;
    this.createdAt = project.createdAt;
    this.creator = new CreatedUserOutputDto(project.creator);
    this.membersCount = project.membersCount;
    this.members = project.members.map((member) => ({
      id: member.id,
      fullName: member.fullName,
      email: member.email,
      role: member.UserProject.role,
    }));
  }
}
