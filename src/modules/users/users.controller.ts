import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AccessGuard } from '@common/guards';
import { GuardUser } from '@common/types';

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
    try {
      const user = await this.usersService.createUser(body);

      return new CreatedUserOutputDto(user);
    } catch (error) {
      throw new HttpException(error.message, error?.status ?? 500);
    }
  }

  @ApiResponse({
    status: 200,
    description: 'get user from tokens',
    type: UserOutputDto,
  })
  @HttpCode(200)
  @UseGuards(AccessGuard)
  @Get('/me')
  async getUser(@Req() request: GuardUser): Promise<UserOutputDto> {
    try {
      const user = await this.usersService.getUserByPk(request.user.id);

      return new UserOutputDto(user);
    } catch (error) {
      throw new HttpException(error.message, error?.status ?? 500);
    }
  }
}
