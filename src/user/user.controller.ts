import { Controller, Get, Post, Body, ValidationPipe, UsePipes } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  test(): string {
    return 'test controller';
  }

 /* @Get()
  getUsers(): string[] {
     return this.UsersService.getUsers(); 
  }*/
}