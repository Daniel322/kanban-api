import {
  Body,
  Controller,
  Get,
  HttpCode,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { UserRole, Roles, User } from '@common/decorators';
import { AccessGuard, RoleGuard } from '@common/guards';
import { GuardUser, Role, RequestUser, RoleType } from '@common/types';

import { TeamsService } from './teams.service';
import { CreateTeamDto, CreatedTeamOutputDto } from './dto';
import { MyTeamsOutputDto } from './dto/myTeamsOutputDto';

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
    @Req() request: GuardUser,
  ): Promise<MyTeamsOutputDto[]> {
    const teams = await this.teamsService.getUserTeams(request.user.id);

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
    @Req() request: GuardUser,
  ): Promise<CreatedTeamOutputDto> {
    const team = await this.teamsService.createTeam({
      name: body.name,
      userId: request.user.id,
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
  async updateTeamInfo(
    @Req() request: GuardUser,
    @User() user: RequestUser,
    @UserRole() role: Role,
  ) {
    console.log(request.role, user, role);

    return true;
  }
}
