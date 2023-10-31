import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { promisify } from 'util';
const bcrypt = require('bcrypt')
const compare = promisify(bcrypt.compare);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(email, pass) {
    const user = await this.usersService.findUserByEmailForAuth(email);

    const validUser = this.validateUser(email, pass);
    if (!validUser) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findUserByEmailForAuth(email);

    const passwordMatch = await compare(pass, user?.password);

    if (passwordMatch) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }
}