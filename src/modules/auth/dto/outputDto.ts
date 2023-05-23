import { ApiProperty } from '@nestjs/swagger';

import { User } from '@modules/users/users.types';

export class AuthOutputDto {
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
    this.fullName = user.fullName;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
  }
}
