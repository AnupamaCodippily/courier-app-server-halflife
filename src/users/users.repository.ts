import { Injectable } from '@nestjs/common';
import User from './entities/user.entity';
import { Prisma } from '@prisma/client';
import PrismaService from 'src/prisma-client/prisma.service';


@Injectable()
export default class UsersRepository {

  constructor(private readonly prismaService: PrismaService) { }

  async user(
    userWhereUniqueInput: Prisma.ShipperWhereUniqueInput,
  ): Promise<User | null> {
    return this.prismaService.shipper.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async createUser(data: Prisma.ShipperCreateInput): Promise<User> {
    return this.prismaService.shipper.create({
      data,
    });
  }

  async updateUser(params: {
    where: Prisma.ShipperWhereUniqueInput;
    data: Prisma.ShipperUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prismaService.shipper.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.ShipperWhereUniqueInput): Promise<User> {
    return this.prismaService.shipper.delete({
      where,
    });
  }
}