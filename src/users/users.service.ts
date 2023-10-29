import { Injectable } from '@nestjs/common';
import User from './entities/user.entity';
import UsersRepository from './users.repository';
import UpdateUserDto from './dto/update-user.dto';

@Injectable()
export class UsersService {

    constructor(private readonly usersRepository: UsersRepository) { }

    async findByEmail(email: string): Promise<User | undefined> {
        return await this.usersRepository.user({ email });
    }

    async findById(id: number): Promise<(User | null)> {
        return await this.usersRepository.user({id});
    }

    async createUser(user: User) {
        return await this.usersRepository.createUser(user);
    }

    async updateUser(id: number, updateUserDto: UpdateUserDto) {

        if (updateUserDto.userDetails?.id || updateUserDto.userDetails?.email) return;

        return await this.usersRepository.updateUser({ where:{id: +id }, data: { ...updateUserDto.userDetails } });
    }
}