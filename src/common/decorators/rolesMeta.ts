import { applyDecorators, SetMetadata } from '@nestjs/common';
import { RoleType } from '@common/types';

export const Roles = (type: RoleType, ...roles: string[]) => {
  return applyDecorators(
    SetMetadata('roles', roles),
    SetMetadata('type', type),
  );
};
