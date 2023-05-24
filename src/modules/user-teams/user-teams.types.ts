import { Role } from '@common/types';

export interface UserTeam {
  userId: string;
  teamId: string;
  role: Role;
}
