import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';
import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { SequelizeModule } from '@nestjs/sequelize';
//COMMON
import { EnvConfig, SequelizeConfig } from '@common/configs';
import { HttpExceptionFilter } from '@common/exceptions';
import { SharedModule } from '@common/shared/shared.module';
//MODULES
import { AuthModule } from '@modules/auth/auth.module';
import { ProjectsModule } from '@modules/projects/projects.module';
import { TeamsModule } from '@modules/teams/teams.module';
import { UsersModule } from '@modules/users/users.module';
import { UserProjectsModule } from '@modules/user-projects/user-projects.module';
import { UserTeamsModule } from '@modules/user-teams/user-teams.module';

@Module({
  imports: [
    CacheModule.register(),
    ConfigModule.forRoot(EnvConfig),
    SequelizeModule.forRootAsync(SequelizeConfig),
    SharedModule,
    //MODULES
    AuthModule,
    ProjectsModule,
    TeamsModule,
    UsersModule,
    UserProjectsModule,
    UserTeamsModule,
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
