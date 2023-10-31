import { Module } from '@nestjs/common';
import { ShipmentsService } from './shipments.service';
import { ShipmentsController } from './shipments.controller';
import { UsersService } from 'src/users/users.service';
import ShipmentsRepository from './shipments.repository';
import UsersRepository from 'src/users/users.repository';
import PrismaService from 'src/prisma-client/prisma.service';

@Module({
  controllers: [ShipmentsController],
  providers: [ShipmentsService, UsersService, ShipmentsRepository, UsersRepository, PrismaService],
})
export class ShipmentsModule {}
