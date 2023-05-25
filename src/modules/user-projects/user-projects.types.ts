import { Role } from '@common/types';

export interface CreateUserProjectData {
  userId: string;
  projectId: string;
  role: Role;
}
