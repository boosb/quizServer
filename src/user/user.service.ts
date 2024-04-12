import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { Role } from './entities/role.entity';
import { UpdateUserAvatarDto } from './dto/update-user-avatar.dto';
import { AuthService } from 'src/auth/auth.service';
import { UpdateUserEmailDto } from './dto/update-user-email.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    //private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existUser = await this.userRepository.findOne({
      where: {
        email: createUserDto.email
      }
    });

    if(existUser) {
      throw new BadRequestException('This email already exist!');
    }

    const user = await this.userRepository.save({
      email: createUserDto.email,
      password: await argon2.hash(createUserDto.password),
      roleId: createUserDto.roleId || 1, // set the default value
      role: createUserDto.role || await this.getRole(1)
    });

   // const token = this.jwtService.sign({email: createUserDto.email});

    return {user};
  }

  async getUser(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      relations: {
        role: true,
      },
    });
  }

  async getUserById(id: number) {
    return await this.userRepository.findOne({
      where: { id },
      relations: {
        role: true,
      },
    });
  }

  async getAllUsers() {
    return await this.userRepository.find();
  }

  async updateUser(id: number, createUserDto: CreateUserDto) {
    return await this.userRepository.update(id, createUserDto);
  }

  async updateUserEmail(id: number, updateUserEmailDto: UpdateUserEmailDto) {
    return await this.userRepository.update(id, updateUserEmailDto);
  }

  async updateUserAvatar(id: number, updateUserAvatarDto: UpdateUserAvatarDto) {
    return await this.userRepository.update(id, updateUserAvatarDto);
  }

  async getRole(id: number) { // todo хз, мб вынесу потом в отдельный сервис
    return await this.roleRepository.findOne({
      where: { id }
    });
  }

  async markEmailAsConfirmed(email: string) {
    return this.userRepository.update({ email }, {
      isEmailConfirmed: true
    });
  }
}