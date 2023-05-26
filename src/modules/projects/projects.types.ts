import { UserProject } from '@modules/user-projects/user-projects.types';
import { User } from '@modules/users/users.types';

export interface CreateProjectData {
  name: string;
  creatorId: string;
  teamId?: string;
}

export interface Project {
  id: string;
  name: string;
  creator?: User;
  creatorId: string;
  teamId?: string;
  createdAt: Date;
  userProjects?: UserProject[];
  UserProject?: UserProject;
}
