import { Injectable } from '@nestjs/common';
import User from './entities/user.entity';
import UsersRepository from './users.repository';
import UpdateUserDto from './dto/update-user.dto';
import { promisify } from 'util';
const bcrypt = require('bcrypt');

const genSalt = promisify(bcrypt.genSalt); 
const hash = promisify(bcrypt.hash);
const SALT_ROUNDS = 10;

@Injectable()
export class UsersService {

    constructor(private readonly usersRepository: UsersRepository) { }

    async findByEmail(email: string): Promise<User | undefined> {
        let user: User = await this.usersRepository.user({ email });

        if (user?.password) delete user.password;

        return user;
    }


    async findById(id: number): Promise<(User | null)> {
        let user: User = await this.usersRepository.user({ id: +id });

        if (user?.password) delete user.password;

        return user;
    }


    async findUserByEmailForAuth(email: string) {
        let user: User = await this.usersRepository.user({ email });
        return user;
    }


    async createUser(user: User) {
        try {
            const salt = await genSalt(SALT_ROUNDS);
            const password = await hash(user.password, salt);

            const newUser = await this.usersRepository.createUser({...user, password});
            delete newUser.password;
            return newUser;
        } catch (exception) {
            console.log(exception);
            return null;
        }
    }

    async updateUser(id: number, updateUserDto: UpdateUserDto) {

        if (updateUserDto.userDetails?.id || updateUserDto.userDetails?.email) return null;

        try {
            return await this.usersRepository.updateUser({ where: { id: +id }, data: { ...updateUserDto.userDetails } });
        } catch (exception) {
            console.log("Error updating user");
            return null;
        }
    }

    async deleteUser(id: number) {
        return await this.usersRepository.deleteUser({ id: +id })
    }
}