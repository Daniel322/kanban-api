import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AccessGuard } from '@common/guards';
import { GuardUser } from '@common/types';

import { ProjectsService } from './projects.service';
import {
  CreateProjectDto,
  CreatedProjectOutputDto,
  MyProjectsOutputDto,
} from './dto';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @ApiResponse({
    status: 200,
    description: 'get user projects',
    type: MyProjectsOutputDto,
    isArray: true,
  })
  @HttpCode(200)
  @UseGuards(AccessGuard)
  @Get('/my-projects')
  async getListOfUserProjects(
    @Req() request: GuardUser,
  ): Promise<MyProjectsOutputDto[]> {
    const projects = await this.projectsService.getListOfUserProjects(
      request.user.id,
    );

    return projects.map((project) => new MyProjectsOutputDto(project.toJSON()));
  }

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
