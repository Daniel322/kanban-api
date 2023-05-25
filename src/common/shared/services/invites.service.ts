import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { getUniqueKey } from '@common/utils';

import { CreateInviteLinkProps } from '../shared.types';

import { RedisService } from './redis.service';

@Injectable()
export class InvetesService {
  private readonly frontendUrl: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
  ) {
    this.frontendUrl = this.configService.get('config.frontendUrl');
  }

  async generateInviteLink({
    id,
    type,
  }: CreateInviteLinkProps): Promise<string> {
    const token = getUniqueKey(12);

    await this.redisService.set(token, { id, type }, 1800);

    return `${this.frontendUrl}/invite?token=${token}&type=${type}&id=${id}`;
  }

  async checkInviteLink(token: string): Promise<boolean> {
    const data = await this.redisService.get(token);

    if (!data) {
      throw new ForbiddenException('invite__time-out');
    }

    return true;
  }
}
