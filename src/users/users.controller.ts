import { Controller } from '@nestjs/common';
import { Get, Param } from '@nestjs/common/decorators/http'; 
import { User } from './user.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) {}

    @Get("/:id")
    async getUserById(@Param('id') id: number) : Promise<User|null>{
       const user = await this.userService.findById(id);
       console.log(user)
       return user;
    }

}
