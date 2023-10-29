import { Injectable } from '@nestjs/common';
import { User } from './user.interface';
import { Prisma } from '@prisma/client';
import PrismaService from 'src/prisma-client/prisma.service';


@Injectable()
export default class UsersRepository {

    constructor (private readonly prismaService : PrismaService) {}

    async user(
        userWhereUniqueInput: Prisma.UserWhereUniqueInput,
      ): Promise<User | null> {
        return this.prismaService.user.findUnique({
          where: userWhereUniqueInput,
        });
      }

      async createUser(data: Prisma.UserCreateInput): Promise<User> {
        return this.prismaService.user.create({
          data,
        });
      }
    
      async updateUser(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
      }): Promise<User> {
        const { where, data } = params;
        return this.prismaService.user.update({
          data,
          where,
        });
      }
    
      async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
        return this.prismaService.user.delete({
          where,
        });
      }
    }