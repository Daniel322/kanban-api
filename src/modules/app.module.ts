import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';
import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { SequelizeModule } from '@nestjs/sequelize';

import { EnvConfig, SequelizeConfig } from '@common/configs';
import { HttpExceptionFilter } from '@common/exceptions';

@Module({
  imports: [
    CacheModule.register(),
    ConfigModule.forRoot(EnvConfig),
    SequelizeModule.forRootAsync(SequelizeConfig),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
