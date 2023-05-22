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
import { Project } from '@modules/projects/projects.entity';
import { User } from '@modules/users/users.entity';

@Table
export class UserProject extends Model {
  @Index('user_project_unique')
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

  @Index('user_project_unique')
  @ForeignKey(() => Project)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    validate: {
      notEmpty: true,
      isUUID: 4,
    },
  })
  projectId: string;

  @BelongsTo(() => Project, 'projectId')
  project: Project;

  @Column({
    type: DataType.ENUM('owner', 'admin', 'member'),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  })
  role: Role;
}
