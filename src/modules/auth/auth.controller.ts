import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { Response } from 'express';

import { AuthService } from './auth.service';
import { LoginBodyDto } from './dto';
import { AuthOutputDto } from './dto/outputDto';
import { AccessGuard, RefreshGuard } from '@common/guards';
import { GuardUser } from '@common/types';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly domain: string;

  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    this.domain = this.configService.get('config.cookieDomain');
  }

  @ApiResponse({
    status: 200,
    description: 'login user',
    type: AuthOutputDto,
  })
  @HttpCode(200)
  @Post('/login')
  async login(
    @Body() body: LoginBodyDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<AuthOutputDto> {
    try {
      const user = await this.authService.login(body, response);

      return new AuthOutputDto(user);
    } catch (error) {
      throw new HttpException(error.message, error?.status ?? 500);
    }
  }

  @ApiResponse({
    status: 200,
    description: 'refresh tokens',
    type: AuthOutputDto,
  })
  @UseGuards(RefreshGuard)
  @Post('/refresh')
  async refresh(
    @Req() request: GuardUser,
    @Res({ passthrough: true }) response: Response,
  ): Promise<AuthOutputDto> {
    try {
      const user = await this.authService.refresh(
        {
          userId: request.user.id,
          refreshToken: request.cookies['refresh-token'],
        },
        response,
      );

      return new AuthOutputDto(user);
    } catch (error) {
      throw new HttpException(error.message, error?.status ?? 500);
    }
  }

  @ApiResponse({
    status: 200,
    description: 'logout endpoint',
  })
  @UseGuards(AccessGuard)
  @Get('/logout')
  logout(@Res({ passthrough: true }) response: Response): void {
    try {
      response.clearCookie('access-token', {
        domain: this.domain,
        httpOnly: true,
      });
      response.clearCookie('refresh-token', {
        domain: this.domain,
        httpOnly: true,
      });
    } catch (error) {
      throw new HttpException(error.message, error?.status ?? 500);
    }
  }
}
