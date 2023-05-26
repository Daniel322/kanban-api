import { InviteType } from '@common/types';

export interface CreateInviteLinkProps {
  id: string;
  type: InviteType;
}

export interface InviteObject {
  name: string;
  id: string;
  createdAt: string;
  type: InviteType;
}
