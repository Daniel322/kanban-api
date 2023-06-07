import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AccessGuard } from '@common/guards';
import { RequestUser } from '@common/types';

import { ProjectsService } from './projects.service';
import {
  CreateProjectDto,
  CreatedProjectOutputDto,
  MyProjectsOutputDto,
} from './dto';
import { User } from '@common/decorators';

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
    @User() { id }: RequestUser,
  ): Promise<MyProjectsOutputDto[]> {
    const projects = await this.projectsService.getListOfUserProjects(id);

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
    @User() { id }: RequestUser,
  ): Promise<CreatedProjectOutputDto> {
    const project = await this.projectsService.createProject({
      creatorId: id,
      teamId: body.teamId,
      name: body.name,
    });

    return new CreatedProjectOutputDto(project.toJSON());
  }
}
