import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { UserProjectsService } from '@modules/user-projects/user-projects.service';
import { UserTeamsService } from '@modules/user-teams/user-teams.service';

@Injectable()
export class TeamRoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly userTeamsService: UserTeamsService,
  ) {}

  async canActivate(ctx: ExecutionContext) {
    const req = ctx.switchToHttp().getRequest();
    const roles = this.reflector.get<string[]>('roles', ctx.getHandler());
    const { user, params } = req;

    const currentRole = await this.userTeamsService.getUserRole({
      userId: user.id,
      teamId: params.id,
    });

    req.role = currentRole.toJSON();
    const { role } = req.role;

    if (!roles.includes(role)) {
      throw new ForbiddenException('user__have-not-access');
    }

    return true;
  }
}

@Injectable()
export class ProjectRoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly userProjectsService: UserProjectsService,
  ) {}

  async canActivate(ctx: ExecutionContext) {
    const req = ctx.switchToHttp().getRequest();
    const roles = this.reflector.get<string[]>('roles', ctx.getHandler());
    const { user, params } = req;

    const currentRole = await this.userProjectsService.getUserRole({
      userId: user.id,
      projectId: params.id,
    });

    req.role = currentRole.toJSON();
    const { role } = req.role;

    if (!roles.includes(role)) {
      throw new ForbiddenException('user__have-not-access');
    }

    return true;
  }
}
