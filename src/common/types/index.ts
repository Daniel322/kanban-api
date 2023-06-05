import { Request } from 'express';

import { User } from '@modules/users/users.types';

export type RequestUser = Pick<User, 'id'>;

export enum Role {
  Owner = 'owner',
  Admin = 'admin',
  Member = 'member',
}

export interface CheckRoleProps {
  userId: string;
  teamId?: string;
  projectId?: string;
}

export interface GuardUser extends Request {
  user: RequestUser;
  role: unknown;
}

export enum RoleType {
  Project = 'project',
  Team = 'team',
}

export interface Member {
  fullName: string;
  id: string;
  role: Role;
  email: string;
}
