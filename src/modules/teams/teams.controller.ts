import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { Roles, User } from '@common/decorators';
import { AccessGuard, RoleGuard } from '@common/guards';
import { Role, RequestUser, RoleType } from '@common/types';

import { TeamsService } from './teams.service';
import {
  CreateTeamDto,
  CreatedTeamOutputDto,
  MyTeamsOutputDto,
  UpdateTeamDto,
} from './dto';

@ApiTags('teams')
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @ApiResponse({
    status: 200,
    description: 'get list of user teams',
    isArray: true,
    type: MyTeamsOutputDto,
  })
  @HttpCode(200)
  @UseGuards(AccessGuard)
  @Get('/my-teams')
  async getListOfUserTeams(
    @User() { id }: RequestUser,
  ): Promise<MyTeamsOutputDto[]> {
    const teams = await this.teamsService.getUserTeams(id);

    return teams.map((team) => new MyTeamsOutputDto(team.toJSON()));
  }

  @ApiResponse({
    status: 201,
    description: 'create team',
    type: CreatedTeamOutputDto,
  })
  @HttpCode(201)
  @UseGuards(AccessGuard)
  @Post('/create')
  async createTeam(
    @Body() body: CreateTeamDto,
    @User() { id }: RequestUser,
  ): Promise<CreatedTeamOutputDto> {
    const team = await this.teamsService.createTeam({
      name: body.name,
      userId: id,
    });

    return new CreatedTeamOutputDto(team.toJSON());
  }

  @ApiResponse({
    status: 200,
    description: 'update team info',
  })
  @Roles(RoleType.Team, Role.Owner)
  @UseGuards(AccessGuard, RoleGuard)
  @Patch('/:id')
  async updateTeamInfo(@Body() body: UpdateTeamDto, @Param('id') id: string) {
    return this.teamsService.updateTeamInfo({
      id,
      ...body,
    });
  }
}
