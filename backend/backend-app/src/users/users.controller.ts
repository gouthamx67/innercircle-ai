import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getUsers() {
    return this.usersService.getAllUsers();
  }

  @Post()
  createUser(@Body() body: any) {
    return this.usersService.createUser(body);
  }
}