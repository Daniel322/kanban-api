import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { SharedModule } from '@common/shared/shared.module';
import { JwtAccessStrategy, JwtRefreshStrategy } from '@common/guards';

import { UsersModule } from '@modules/users/users.module';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    ConfigModule,
    JwtModule.register({}),
    PassportModule,
    SharedModule,
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [JwtAccessStrategy, JwtRefreshStrategy, AuthService],
})
export class AuthModule {}
