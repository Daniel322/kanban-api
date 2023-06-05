import { UserTeamsService } from "@modules/user-teams/user-teams.service";
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class TeamRoleGuard implements CanActivate {
  constructor(
    private readonly userTeamsService: UserTeamsService,
  ) {}

  async canActivate(ctx: ExecutionContext) {
    const req = ctx.switchToHttp().getRequest();
    const { user, body } = req;
    
    const currentRole = await this.userTeamsService.getUserRole({
      userId: user.id,
      teamId: body.teamId,
    });

    req.role = currentRole;

    return true;
  }
}