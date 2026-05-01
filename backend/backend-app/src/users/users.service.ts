import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users: any[] = [];

    getAllUsers() {
        return this.users;
    }

    createUser(user: any) {
        this.users.push(user);
        return user;
    }
}