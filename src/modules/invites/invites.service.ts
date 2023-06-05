import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { getUniqueKey } from '@common/utils';
import { RedisService } from '@common/shared/services/redis.service';
import { RoleType as InviteType, Role } from '@common/types';

import { ProjectsService } from '@modules/projects/projects.service';
import { TeamsService } from '@modules/teams/teams.service';
import { UserProjectsService } from '@modules/user-projects/user-projects.service';
import { UserProject } from '@modules/user-projects/user-projects.types';
import { UserTeamsService } from '@modules/user-teams/user-teams.service';
import { UserTeam } from '@modules/user-teams/user-teams.types';

import { InviteLinkProps, InviteObject } from './invites.types';

@Injectable()
export class InvitesService {
  private readonly frontendUrl: string;
  private readonly inviteLinkTtl: number;

  constructor(
    private readonly configService: ConfigService,
    private readonly projectsService: ProjectsService,
    private readonly redisService: RedisService,
    private readonly teamsService: TeamsService,
    private readonly userProjectsService: UserProjectsService,
    private readonly userTeamsService: UserTeamsService,
  ) {
    this.frontendUrl = this.configService.get('config.frontendUrl');
    this.inviteLinkTtl = 1800;
  }

  async generateInviteLink({
    id,
    type,
    userId,
  }: InviteLinkProps): Promise<string> {
    const { role } =
      type === InviteType.Project
        ? await this.userProjectsService.getUserRole({ userId, projectId: id })
        : await this.userTeamsService.getUserRole({ userId, teamId: id });

    if (role === Role.Member) {
      throw new ForbiddenException('user__have-not-access');
    }

    const token = getUniqueKey(12);

    await this.redisService.set(token, { id, type }, this.inviteLinkTtl);

    return `${this.frontendUrl}/invite?token=${token}`;
  }

  async checkInviteLink(token: string): Promise<InviteObject> {
    const data = await this.redisService.get<InviteLinkProps>(token);

    if (!data) {
      throw new ForbiddenException('invite__time-out');
    } else {
      const { type, id } = data;

      const inviteObject =
        type === InviteType.Project
          ? await this.projectsService.getCurrentProject(id)
          : await this.teamsService.getCurrentTeam(id);

      return {
        ...inviteObject.toJSON(),
        type,
      };
    }
  }

  async acceptInvite(
    token: string,
    userId: string,
  ): Promise<UserProject | UserTeam> {
    const data = await this.redisService.get<InviteLinkProps>(token);

    if (!data) {
      throw new ForbiddenException('invite__time-out');
    }

    const { type, id } = data;

    const result =
      type === InviteType.Project
        ? await this.userProjectsService.createUserProject({
            userId,
            projectId: id,
            role: Role.Member,
          })
        : await this.userTeamsService.createUserTeam({
            userId,
            teamId: id,
            role: Role.Member,
          });

    return result;
  }
}
