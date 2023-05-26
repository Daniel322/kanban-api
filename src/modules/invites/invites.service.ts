import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { getUniqueKey } from '@common/utils';
import { RedisService } from '@common/shared/services/redis.service';

import { CreateInviteLinkProps, InviteObject } from './invites.types';
import { InviteType } from '@common/types';
import { ProjectsService } from '@modules/projects/projects.service';
import { TeamsService } from '@modules/teams/teams.service';

@Injectable()
export class InvitesService {
  private readonly frontendUrl: string;
  private readonly inviteLinkTtl: number;

  constructor(
    private readonly configService: ConfigService,
    private readonly projectsService: ProjectsService,
    private readonly redisService: RedisService,
    private readonly teamsService: TeamsService,
  ) {
    this.frontendUrl = this.configService.get('config.frontendUrl');
    this.inviteLinkTtl = 1800;
  }

  async generateInviteLink({
    id,
    type,
  }: CreateInviteLinkProps): Promise<string> {
    const token = getUniqueKey(12);

    await this.redisService.set(token, { id, type }, this.inviteLinkTtl);

    return `${this.frontendUrl}/invite?token=${token}`;
  }

  async checkInviteLink(token: string): Promise<InviteObject> {
    const data = await this.redisService.get<CreateInviteLinkProps>(token);

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
}
