import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import type { CreateUserDto, User } from '../users/user.types';

interface LoginResponse {
  access_token: string;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = this.usersService.findByEmail(email);

    if (!user) throw new UnauthorizedException();

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new UnauthorizedException();

    return user;
  }

  login(user: User): LoginResponse {
    const payload = { email: user.email };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(user: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    return this.usersService.createUser({
      ...user,
      password: hashedPassword,
    });
  }
}
