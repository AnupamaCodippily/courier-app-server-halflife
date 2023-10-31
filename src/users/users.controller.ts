import { Controller, HttpStatus } from '@nestjs/common';
import { Body, Delete, Get, HttpCode, Param, Post, Patch, Res } from '@nestjs/common/decorators/http';
import User from './entities/user.entity';
import { UsersService } from './users.service';
import CreateUserDto from './dto/create-user.dto';
import { Response } from 'express';
import { Owner } from 'src/auth/jwt-owner.decorator';
import UpdateUserDto from './dto/update-user.dto';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) { }

    @Get(":id")
    async getUserById(@Param('id') id: number, @Res({ passthrough: true }) res: Response): Promise<User | null> {
        const user = await this.userService.findById(id);

        if (!user) res.status(HttpStatus.NOT_FOUND).send();

        return user;
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto, @Res({ passthrough: true }) res: Response) {
        const user: User = await this.userService.createUser(createUserDto.userDetails);

        if (!user) res.status(HttpStatus.BAD_REQUEST).send();

        return user;
    }

    @Patch(":id")
    async updateUser(
        @Param('id') id: number,
        @Body() updateUserDto: UpdateUserDto,
        @Res({ passthrough: true }) res: Response,
        @Owner() owner) {

        if (id != owner.userId) res.status(HttpStatus.FORBIDDEN).send();

        else {
            const user: User = await this.userService.updateUser(id, updateUserDto);

            if (!user) res.status(HttpStatus.BAD_REQUEST).send();
        }
    }

    @Delete(':id')
    async deleteUser(@Param("id") id: number) {
        await this.userService.deleteUser(id);
    }

}
