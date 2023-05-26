import { Project } from '@modules/projects/projects.types';
import { Team } from '@modules/teams/teams.types';

export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  fullName: string;
  lastName: string;
}

export interface UserWithIncludes extends User {
  teams?: Team[];
  projects?: Project[];
}

export interface CreateUserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
