import { Controller } from '@nestjs/common';
import { Body, Get, Param, Post, Put } from '@nestjs/common/decorators/http'; 
import User from './entities/user.entity';
import { UsersService } from './users.service';
import CreateUserDto from './dto/create-user.dto';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) {}

    @Get("/:id")
    async getUserById(@Param('id') id: number) : Promise<User|null>{
       const user = await this.userService.findById(id);
       console.log(user)
       return user;
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto)  {
        this.userService.createUser(createUserDto.userDetails);
    }

    @Put("/:id")
    async updateUser( @Param('id') id: number, @Body() updateUserDto) {
        this.userService.updateUser(id, updateUserDto);
    }

}
