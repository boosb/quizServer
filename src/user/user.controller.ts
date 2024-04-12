import { Controller, Get, Post, Body, ValidationPipe, UsePipes, Patch, Param, UseInterceptors, UploadedFile, InternalServerErrorException, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './user.service';
import { AuthService } from 'src/auth/auth.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { writeFile } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UpdateUserEmailDto } from './dto/update-user-email.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto); // todo возможно, не стоит 
    await this.authService.sendVerificationLink(createUserDto.email, null);
    return user;
  }

  @Get('all')
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() createUserDto: CreateUserDto) {
    /*const user = await this.userService.getUserById(id); // todo ваще не оч понятно стоит ли эту логику оставить тут или пенести в сервисы
    if(user.email !== createUserDto.email) {
      await this.authService.sendVerificationLink(createUserDto.email);
    }*/
    return this.userService.updateUser(id, createUserDto);
  }

  @Patch('confirm-email/:id')
  async updateEmail(@Param('id') id: number, @Body() updateUserEmailDto: UpdateUserEmailDto) {
    /*await this.authService.sendVerificationLink(createUserDto.email);
    return this.userService.updateUser(id, createUserDto);*/
    
    return await this.authService.sendVerificationLink(updateUserEmailDto.email, updateUserEmailDto.oldEmail);
  }

 /* @Get()
  getUsers(): string[] {
     return this.UsersService.getUsers(); 
  }*/
}