import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto, CreatedUserOutputDto } from './dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({
    status: 201,
    description: 'create user',
  })
  @HttpCode(201)
  @Post('/create')
  async createUser(@Body() body: CreateUserDto): Promise<CreatedUserOutputDto> {
    try {
      const user = await this.usersService.createUser(body);

      return new CreatedUserOutputDto(user);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
