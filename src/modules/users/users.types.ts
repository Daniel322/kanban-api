import { Project } from '@modules/projects/projects.types';
import { Team } from '@modules/teams/teams.types';
import { UserProject } from '@modules/user-projects/user-projects.types';
import { UserTeam } from '@modules/user-teams/user-teams.types';

export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  fullName: string;
  lastName: string;
  UserProject?: UserProject;
  UserTeam?: UserTeam;
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
