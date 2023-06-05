import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserRole = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  const { role } = request.role;

  return role;
});
