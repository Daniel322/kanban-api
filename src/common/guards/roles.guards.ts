import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { UserProjectsService } from '@modules/user-projects/user-projects.service';
import { UserTeamsService } from '@modules/user-teams/user-teams.service';

@Injectable()
export class TeamRoleGuard implements CanActivate {
  constructor(private readonly userTeamsService: UserTeamsService) {}

  async canActivate(ctx: ExecutionContext) {
    const req = ctx.switchToHttp().getRequest();
    const { user, params } = req;

    const currentRole = await this.userTeamsService.getUserRole({
      userId: user.id,
      teamId: params.id,
    });

    req.role = currentRole.toJSON();

    return true;
  }
}

@Injectable()
export class ProjectRoleGuard implements CanActivate {
  constructor(private readonly userProjectsService: UserProjectsService) {}

  async canActivate(ctx: ExecutionContext) {
    const req = ctx.switchToHttp().getRequest();
    const { user, params } = req;

    const currentRole = await this.userProjectsService.getUserRole({
      userId: user.id,
      projectId: params.id,
    });

    req.role = currentRole.toJSON();

    return true;
  }
}
