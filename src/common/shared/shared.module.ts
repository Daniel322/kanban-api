import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';

import { BcryptService } from './services/bcrypt.service';
import { RedisService } from './services/redis.service';

@Module({
  imports: [
    ConfigModule,
    CacheModule.registerAsync<RedisClientOptions>({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('config.redisHost'),
        port: configService.get('config.redisPort'),
        ttl: configService.get('config.redisTtl'),
      }),
    }),
  ],
  providers: [BcryptService, RedisService],
  exports: [BcryptService, RedisService],
})
export class SharedModule {}
