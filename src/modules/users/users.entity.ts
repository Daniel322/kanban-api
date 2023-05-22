import {
  Column,
  DataType,
  Model,
  Table,
  PrimaryKey,
  BelongsToMany,
} from 'sequelize-typescript';

import { Project } from '@modules/projects/projects.entity';
import { Team } from '@modules/teams/teams.entity';
import { UserProject } from '@modules/user-projects/user-projects.entity';
import { UserTeam } from '@modules/user-teams/user-teams.entity';

@Table
export class User extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    unique: true,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true,
    },
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  })
  lastName: string;

  @Column(DataType.VIRTUAL)
  get fullName() {
    return `${this.getDataValue('firstName')} ${this.getDataValue('lastName')}`;
  }

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @BelongsToMany(() => Team, () => UserTeam)
  teams: Array<Team & { userTeam: UserTeam }>;

  @BelongsToMany(() => Project, () => UserProject)
  projects: Array<Project & { userProject: UserProject }>;
}
