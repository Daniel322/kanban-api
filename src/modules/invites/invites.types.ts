import { InviteType } from '@common/types';

export interface InviteLinkProps {
  id: string;
  type: InviteType;
  userId: string;
}

export interface InviteObject {
  name: string;
  id: string;
  createdAt: string;
  type: InviteType;
}
