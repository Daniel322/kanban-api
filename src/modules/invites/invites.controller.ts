import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AccessGuard } from '@common/guards';

import { InvitesService } from './invites.service';
import { GenerateInviteLinkDto } from './dto';

@ApiTags('invites')
@Controller('invites')
export class InvitesController {
  constructor(private readonly invitesService: InvitesService) {}

  @ApiResponse({
    status: 201,
    description: 'generate invite link',
  })
  @HttpCode(201)
  @UseGuards(AccessGuard)
  @Post('/create')
  async generateInviteLink(@Body() body: GenerateInviteLinkDto) {
    return this.invitesService.generateInviteLink(body);
  }
}
