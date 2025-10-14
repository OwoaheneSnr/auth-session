import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreatedAdmin } from './interface/created-admin';
import { envs } from '#config/envs';
import { UsersAuthService } from '#modules/users/service/users-auth.service';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(private readonly usersAuthService: UsersAuthService) {}

  async onModuleInit() {
    const admin: CreatedAdmin = {
      email: envs.EMAIL_ADMIN,
      name: envs.NAME_ADMIN,
      password: envs.PASSWORD_ADMIN,
    };
    await this.usersAuthService.createAdmin(admin);
  }
}
