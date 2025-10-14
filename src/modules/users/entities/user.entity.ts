import { ConditionalApiProperty } from '#config/swagger/swagger.decorator';
import { User, Role } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity {
  @ConditionalApiProperty()
  id: string;

  @ConditionalApiProperty()
  name: string;

  @ConditionalApiProperty()
  email: string;

  @Exclude()
  password: string;

  @Exclude()
  available: boolean;

  @ConditionalApiProperty({ enum: Role })
  rol: Role;

  @ConditionalApiProperty()
  createdAt: Date;

  @ConditionalApiProperty()
  updatedAt: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  static fromPrisma(user: User): UserEntity {
    return new UserEntity(user);
  }

  static fromPrismaArray(users: User[]): UserEntity[] {
    return users.map((user) => UserEntity.fromPrisma(user));
  }

  toJwtPayload(): { id: string; rol: Role } {
    return {
      id: this.id,
      rol: this.rol,
    };
  }
}
