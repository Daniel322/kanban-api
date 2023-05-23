import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { Response } from 'express';

import { BcryptService } from '@common/shared/services/bcrypt.service';
import { RedisService } from '@common/shared/services/redis.service';

import { UsersService } from '@modules/users/users.service';
import { User } from '@modules/users/users.entity';
import { LoginProps, RefreshTokenProps } from './auth.types';

@Injectable()
export class AuthService {
  private readonly accessJwtSecret: string;
  private readonly refreshJwtSecret: string;
  private readonly accessJwtTtl: number;
  private readonly refreshJwtTtl: number;
  private readonly domain: string;

  constructor(
    private readonly bcryptService: BcryptService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
    private readonly usersService: UsersService,
  ) {
    this.accessJwtSecret = this.configService.get('config.jwtAccessSecret');
    this.refreshJwtSecret = this.configService.get('config.jwtRefreshSecret');
    this.accessJwtTtl = this.configService.get('config.jwtAccessTtl');
    this.refreshJwtTtl = this.configService.get('config.jwtRefreshTtl');
    this.domain = this.configService.get('config.cookieDomain');
  }

  async generateTokens(user: User, response: Response): Promise<User> {
    try {
      const accessToken: string = this.jwtService.sign(
        { id: user.getDataValue('id') },
        {
          secret: this.accessJwtSecret,
          expiresIn: `${this.accessJwtTtl}m`,
        },
      );

      const refreshToken: string = this.jwtService.sign(
        { id: user.getDataValue('id') },
        {
          secret: this.refreshJwtSecret,
          expiresIn: `${this.refreshJwtTtl}m`,
        },
      );

      await this.redisService.set(
        `refresh_${user.getDataValue('id')}`,
        refreshToken,
        this.refreshJwtTtl * 60,
      );

      response.cookie('access-token', accessToken, {
        httpOnly: true,
        domain: this.domain,
      });

      response.cookie('refresh-token', refreshToken, {
        httpOnly: true,
        domain: this.domain,
      });

      return user;
    } catch (error) {
      throw new HttpException(error.message, error?.status ?? 500);
    }
  }

  async login(
    { email, password }: LoginProps,
    response: Response,
  ): Promise<User> {
    try {
      const user = await this.usersService.getUser({ where: { email } });

      if (!user) {
        throw new NotFoundException('user_email__not-found');
      }

      const userDataPassword = user.getDataValue('password');

      const passwordIsEqual = await this.bcryptService.compare(
        password,
        userDataPassword,
      );

      if (!passwordIsEqual) {
        throw new ForbiddenException({
          message: 'user_password__invalid',
        });
      }

      return this.generateTokens(user, response);
    } catch (error) {
      throw new HttpException(error.message, error?.status ?? 500);
    }
  }

  async refresh(
    { userId, refreshToken }: RefreshTokenProps,
    response: Response,
  ): Promise<User> {
    try {
      const savedRefreshToken = await this.redisService.get(
        `refresh_${userId}`,
      );

      if (savedRefreshToken !== refreshToken) {
        throw new BadRequestException({
          message: 'refresh-token__invalid',
        });
      }

      const tokenPayload = await this.jwtService.verify(refreshToken, {
        secret: this.refreshJwtSecret,
      });

      const user = await this.usersService.getUser({
        where: { id: tokenPayload.id },
      });

      if (!user) {
        throw new NotFoundException({
          message: 'refresh-token__invalid',
        });
      }

      return this.generateTokens(user, response);
    } catch (error) {
      throw new HttpException(error.message, error?.status ?? 500);
    }
  }
}
