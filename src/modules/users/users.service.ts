import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Transaction } from 'sequelize';

import { User } from './users.entity';
import { CreateUserData } from './users.types';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly usersRepositroy: typeof User,
  ) {}

  async createUser(
    data: CreateUserData,
    transaction: Transaction = null,
  ): Promise<User> {
    return this.usersRepositroy.create({ ...data }, { transaction });
  }
}
