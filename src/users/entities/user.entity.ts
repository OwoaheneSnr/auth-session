import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  // * Properties
  id: string;
  name: string;

  @Exclude()
  password: string;

  email: string;

  @Exclude()
  available: boolean;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  // * static helper
  static fromPrisma(user: User): UserEntity {
    return new UserEntity(user);
  }

  static fromPrismaArray(users: User[]): UserEntity[] {
    return users.map((user) => new UserEntity(user));
  }
}
