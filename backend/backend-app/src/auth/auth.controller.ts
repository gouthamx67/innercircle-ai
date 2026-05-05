import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { CreateUserDto, User } from '../users/user.types';

interface LoginResponse {
  access_token: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() body: CreateUserDto): Promise<User> {
    return this.authService.signup(body);
  }

  @Post('login')
  async login(@Body() body: CreateUserDto): Promise<LoginResponse> {
    const user = await this.authService.validateUser(body.email, body.password);

    return this.authService.login(user);
  }
}
