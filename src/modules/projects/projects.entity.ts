import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { Column as ColumnTable } from '@modules/columns/columns.entity';
import { Team } from '@modules/teams/teams.entity';
import { User } from '@modules/users/users.entity';
import { UserProject } from '@modules/user-projects/user-projects.entity';

@Table
export class Project extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    unique: true,
    primaryKey: true,
    validate: {
      notEmpty: true,
      isUUID: 4,
    },
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  })
  name: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    validate: {
      notEmpty: true,
      isUUID: 4,
    },
  })
  creatorId: string;

  @BelongsTo(() => User, 'creatorId')
  creator: User;

  @ForeignKey(() => Team)
  @Column({
    type: DataType.UUID,
    allowNull: true,
    validate: {
      notEmpty: true,
    },
  })
  teamId: string;

  @BelongsTo(() => Team, 'teamId')
  team: Team;

  @HasMany(() => UserProject)
  userProjects: UserProject[];

  @BelongsToMany(() => User, () => UserProject)
  members: Array<User & { userProject: UserProject }>;

  @HasMany(() => ColumnTable)
  columns: ColumnTable[];
}
