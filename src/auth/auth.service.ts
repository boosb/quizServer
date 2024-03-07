import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../user/user.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/types/user';
import { Role } from 'src/user/entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    //@InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    console.log(email, password, ' >>> AAA')
    const user = await this.usersService.getUser(email);
    console.log(user , ' >>>> TEST_TEST_USER')
    const passwordIsMatch = await argon2.verify(user.password, password);

    if (user && passwordIsMatch) {
      return user;
    }

    throw new UnauthorizedException('User or password are incorrect!'); 
  }

  async login(user: IUser) {
    const {id, email, role} = user;
    const userG = await this.usersService.getUser(email);
    console.log(user , ' >>>> TEST_TEST_USER---------1')
    console.log(userG , ' >>>> TEST_TEST_USER---------2')
    return {
      id, 
      email,
      role,
      token: this.jwtService.sign({
        id: user.id, 
        email: user.email
      })
    }
  }
}
