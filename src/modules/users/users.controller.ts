import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { User } from '@common/decorators';
import { AccessGuard } from '@common/guards';
import { RequestUser } from '@common/types';

import { UsersService } from './users.service';
import { CreateUserDto, CreatedUserOutputDto, UserOutputDto } from './dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({
    status: 201,
    description: 'create user',
    type: CreatedUserOutputDto,
  })
  @HttpCode(201)
  @Post('/create')
  async createUser(@Body() body: CreateUserDto): Promise<CreatedUserOutputDto> {
    const user = await this.usersService.createUser(body);

    return new CreatedUserOutputDto(user);
  }

  @ApiResponse({
    status: 200,
    description: 'get user from tokens',
    type: UserOutputDto,
  })
  @HttpCode(200)
  @UseGuards(AccessGuard)
  @Get('/me')
  async getUser(@User() { id }: RequestUser): Promise<UserOutputDto> {
    const user = await this.usersService.getUserByPk(id);

    return new UserOutputDto(user.toJSON());
  }
}
