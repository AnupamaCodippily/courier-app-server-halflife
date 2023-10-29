import { Injectable } from '@nestjs/common';
import { User } from './user.interface';
import UsersRepository from './users.repository';

@Injectable()
export class UsersService {

    constructor(private readonly usersRepository: UsersRepository) { }

    async findByEmail(email: string): Promise<User | undefined> {
        return await this.usersRepository.user({ email });
    }

    async findById(id: number): Promise<(User | null)> {
        return await this.usersRepository.user({id});
    }
}