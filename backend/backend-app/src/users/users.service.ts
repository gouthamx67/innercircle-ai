import { Injectable } from '@nestjs/common';
import type { CreateUserDto, User } from './user.types';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  getAllUsers(): User[] {
    return this.users;
  }

  createUser(user: CreateUserDto): User {
    this.users.push(user);
    return user;
  }

  findByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }
}
