import { Project } from '@modules/projects/projects.entity';
import {
  DataType,
  Model,
  PrimaryKey,
  Table,
  Column as SeqColumn,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

@Table
export class Column extends Model {
  @PrimaryKey
  @SeqColumn({
    type: DataType.UUID,
    primaryKey: true,
    unique: true,
    validate: {
      notEmpty: true,
      isUUID: 4,
    },
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @SeqColumn({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  })
  name: string;

  @SeqColumn({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      isInt: true,
      notEmpty: true,
    },
  })
  index: number;

  @ForeignKey(() => Project)
  @SeqColumn({
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
}
