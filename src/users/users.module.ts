import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import UsersRepository from './users.repository';
import PrismaService from 'src/prisma-client/prisma.service';

@Module({
  providers: [UsersService, UsersRepository, PrismaService],
  exports: [UsersService, UsersRepository],
  controllers: [UsersController],
})
export class UsersModule {}
