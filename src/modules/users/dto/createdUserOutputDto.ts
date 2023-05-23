import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users.types';

export class CreatedUserOutputDto {
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

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.fullName = user.fullName;
  }
}
