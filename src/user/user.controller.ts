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
  //@UseInterceptors(FileInterceptor('avatar'))
  @UseInterceptors(FileInterceptor('avatar',
  {
    storage: diskStorage({
      destination: './avatars', 
      filename: (req, file, cb) => {
      const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
      return cb(null, `${randomName}${extname(file.originalname)}`)
    }
    })
  }
  )
  )
  uploadAvatar(@Param('id') id: number, @UploadedFile() file: Express.Multer.File) { // todo мб вынести все это в отдельный блок (контроллер), типо для файлов
    const SERVER_URL='http://localhost:3000/user'; // todo привести к норм виду 
    const newPath = file.path.split('\\');

    const aPath =  `${SERVER_URL}/${newPath.join('/')}`;
    console.log(aPath, '>>> aPath')
    return this.userService.updateUserAvatar(id, {avatar: aPath});
  }

  @Get('avatars/:fileId')
  async getAvatar(@Param('fileId') fileId: any, @Res() res): Promise<any> {
    return await res.sendFile(fileId, { root: 'avatars'});
  }

 /* @Get()
  getUsers(): string[] {
     return this.UsersService.getUsers(); 
  }*/
}