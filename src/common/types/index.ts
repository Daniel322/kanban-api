import { Request } from 'express';

import { User } from '@modules/users/users.types';

export type RequestUser = Pick<User, 'id'>;

export enum Role {
  Owner = 'owner',
  Admin = 'admin',
  Member = 'member',
}

export interface GuardUser extends Request {
  user: RequestUser;
}

export enum InviteType {
  Project = 'project',
  Team = 'team',
}

export interface Member {
  fullName: string;
  id: string;
  role: Role;
  email: string;
}
