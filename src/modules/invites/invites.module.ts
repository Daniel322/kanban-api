import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SharedModule } from '@common/shared/shared.module';

import { ProjectsModule } from '@modules/projects/projects.module';
import { TeamsModule } from '@modules/teams/teams.module';
import { UserProjectsModule } from '@modules/user-projects/user-projects.module';
import { UserTeamsModule } from '@modules/user-teams/user-teams.module';

import { InvitesService } from './invites.service';
import { InvitesController } from './invites.controller';

@Module({
  imports: [
    ConfigModule,
    ProjectsModule,
    SharedModule,
    TeamsModule,
    UserProjectsModule,
    UserTeamsModule,
  ],
  controllers: [InvitesController],
  providers: [InvitesService],
})
export class InvitesModule {}
