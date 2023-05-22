import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Index,
  Model,
  Table,
} from 'sequelize-typescript';

import { Role } from '@common/types';
import { Team } from '@modules/teams/teams.entity';
import { User } from '@modules/users/users.entity';

@Table
export class UserTeam extends Model {
  @Column({
    type: DataType.ENUM('owner', 'admin', 'member'),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  })
  role: Role;

  @Index('user_team_unique')
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    validate: {
      notEmpty: true,
      isUUID: 4,
    },
  })
  userId: string;

  @BelongsTo(() => User, 'userId')
  user: User;

  @Index('user_team_unique')
  @ForeignKey(() => Team)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    validate: {
      notEmpty: true,
      isUUID: 4,
    },
  })
  teamId: string;

  @BelongsTo(() => Team, 'teamId')
  team: Team;
}
