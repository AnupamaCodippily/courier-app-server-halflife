import { Injectable } from '@nestjs/common';
import { User } from './user.interface';

@Injectable()
export class UsersService {
    private readonly users: User[] = [
        {
            id: 1,
            username: 'john',
            password: 'changeme',
        },
        {
            id: 2,
            username: 'maria',
            password: 'guess',
        },
    ];

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }

    async findById(id: number): Promise<(User | null)> {
        return this.users.find(user => user.id == id);
    }
}