import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AccessGuard } from '@common/guards';

import { InvitesService } from './invites.service';
import {
  AcceptInviteDto,
  AcceptInviteOutputDto,
  CheckInviteTokenOutputDto,
  GenerateInviteLinkDto,
  GeneratedLinkOutputDto,
} from './dto';
import { RequestUser } from '@common/types';
import { User } from '@common/decorators';

@ApiTags('invites')
@Controller('invites')
export class InvitesController {
  constructor(private readonly invitesService: InvitesService) {}

  @ApiResponse({
    status: 201,
    description: 'generate invite link',
    type: GeneratedLinkOutputDto,
  })
  @HttpCode(201)
  @UseGuards(AccessGuard)
  @Post('/create')
  async generateInviteLink(
    @Body() body: GenerateInviteLinkDto,
    @User() { id }: RequestUser,
  ): Promise<GeneratedLinkOutputDto> {
    const link = await this.invitesService.generateInviteLink({
      ...body,
      userId: id,
    });

    return new GeneratedLinkOutputDto(link);
  }

  @ApiResponse({
    status: 200,
    description: 'check invite token',
    type: CheckInviteTokenOutputDto,
  })
  @HttpCode(200)
  @UseGuards(AccessGuard)
  @Get('/check/:token')
  async checkToken(
    @Param('token') token: string,
  ): Promise<CheckInviteTokenOutputDto> {
    const inviteObject = await this.invitesService.checkInviteLink(token);

    return new CheckInviteTokenOutputDto(inviteObject);
  }

  @ApiResponse({
    status: 200,
    description: 'accept invite to project/team',
    type: AcceptInviteOutputDto,
  })
  @HttpCode(200)
  @UseGuards(AccessGuard)
  @Post('/accept')
  async acceptInvite(
    @Body() { token }: AcceptInviteDto,
    @User() { id }: RequestUser,
  ): Promise<AcceptInviteOutputDto> {
    const result = await this.invitesService.acceptInvite(token, id);

    return new AcceptInviteOutputDto(result);
  }
}
