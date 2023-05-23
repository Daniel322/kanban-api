import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { FindOptions, Transaction } from 'sequelize';

import { BcryptService } from '@common/shared/services/bcrypt.service';

import { User } from './users.entity';
import { CreateUserData } from './users.types';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly usersRepositroy: typeof User,
    private readonly bcryptService: BcryptService,
  ) {}

  async getUser(options: FindOptions): Promise<User> {
    return this.usersRepositroy.findOne(options);
  }

  async createUser(
    data: CreateUserData,
    transaction: Transaction = null,
  ): Promise<User> {
    const { email, password } = data;

    const userWithThisEmail = await this.getUser({ where: { email } });

    if (userWithThisEmail) {
      throw new ForbiddenException('user_email_already-exist');
    }

    const hashedPassword = await this.bcryptService.hash(password);

    return this.usersRepositroy.create(
      { ...data, password: hashedPassword },
      { transaction },
    );
  }
}
