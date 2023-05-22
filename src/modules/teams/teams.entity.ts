import {
  Column,
  DataType,
  Model,
  Table,
  PrimaryKey,
  BelongsToMany,
} from 'sequelize-typescript';

import { User } from '@modules/users/users.entity';
import { UserTeam } from '@modules/user-teams/user-teams.entity';

@Table
export class Team extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    unique: true,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
    validate: {
      notEmpty: true,
      isUUID: 4,
    },
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  })
  name: string;

  @BelongsToMany(() => User, () => UserTeam)
  users: Array<User & { userTeam: UserTeam }>;
}
