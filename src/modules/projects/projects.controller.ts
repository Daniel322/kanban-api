import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AccessGuard } from '@common/guards';
import { GuardUser } from '@common/types';

import { ProjectsService } from './projects.service';
import { CreateProjectDto, CreatedProjectOutputDto } from './dto';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @ApiResponse({
    status: 201,
    description: 'create project',
    type: CreatedProjectOutputDto,
  })
  @HttpCode(201)
  @UseGuards(AccessGuard)
  @Post('/create')
  async createProject(
    @Body() body: CreateProjectDto,
    @Req() request: GuardUser,
  ): Promise<CreatedProjectOutputDto> {
    const project = await this.projectsService.createProject({
      creatorId: request.user.id,
      teamId: body.teamId,
      name: body.name,
    });

    return new CreatedProjectOutputDto(project.toJSON());
  }
}
