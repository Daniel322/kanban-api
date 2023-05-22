import {
  Column,
  DataType,
  Model,
  Table,
  PrimaryKey,
} from 'sequelize-typescript';

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
}
