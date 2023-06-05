import { UserTeam } from '@modules/user-teams/user-teams.entity';
import { User } from '@modules/users/users.types';

export interface CreateTeamData {
  name: string;
  userId: string;
}

export interface Team {
  id: string;
  name: string;
  createdAt: Date;
  UserTeam?: UserTeam;
  userTeams?: UserTeam[];
  users?: Array<User & { UserTeam: UserTeam }>;
  membersCount?: number;
}

export interface UpdateTeamData extends Omit<CreateTeamData, 'userId'> {
  id: string;
}