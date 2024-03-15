import { Controller, Get, Post, Body, ValidationPipe, UsePipes, Patch, Param, UseInterceptors, UploadedFile, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './user.service';
import { AuthService } from 'src/auth/auth.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { writeFile } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';

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
    const user = await this.userService.create(createUserDto);
    await this.authService.sendVerificationLink(createUserDto.email);
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
  update(@Param('id') id: number, @Body() createUserDto: CreateUserDto) {
    return this.userService.updateUser(id, createUserDto);
  }

  @Post('avatar/:id')
  @UseInterceptors(FileInterceptor('avatar'))
  uploadAvatar(@Param('id') id: number, @UploadedFile() file: Express.Multer.File) { // todo мб вынести все это в отдельный блок (контроллер), типо для файлов
    const staticPath = this.configService.get('STATIC_PATH');
    const avatarName = `${uuidv4()}.jpg`;
    const filePath = `${staticPath}\\${avatarName}`;

    writeFile(filePath, file.buffer, error => {
      if(error) {
        throw new InternalServerErrorException('Error setting avatar');
      }
    });

    return this.userService.updateUserAvatar(id, {avatar: avatarName});
  }

  @Get('avatar/:test')
  getAvatar(@Param('test') test: any) {

  }

 /* @Get()
  getUsers(): string[] {
     return this.UsersService.getUsers(); 
  }*/
}