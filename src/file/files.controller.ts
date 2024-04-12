import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { UsersService } from "src/user/user.service";
import { FilesService } from "./files.service";
import { QuestionService } from "src/question/question.service";

@Controller('files')
export class FilesController {
  constructor(
    private readonly userService: UsersService,
    private readonly questionsService: QuestionService,
    private readonly filesService: FilesService
  ) {}

  @Post('avatar/:id')
  @UseInterceptors(FileInterceptor('avatar', {
    storage: diskStorage({
        destination: './static/avatars', 
        filename: (req, file, cb) => {
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
          const name =  cb(null, `${randomName}${extname(file.originalname)}`);
          return name;
        }
      })
    })
  )
  uploadAvatar(@Param('id') id: number, @UploadedFile() file: Express.Multer.File) {
    const avatarPath = this.filesService.getAvatarPath(file.path);
    return this.userService.updateUserAvatar(id, {avatar: avatarPath});

  }

  @Post('questions')
  @UseInterceptors(FileInterceptor('questions', {
    storage: diskStorage({
        destination: './static/questions', 
        filename: (req, file, cb) => {
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
          const name =  cb(null, `${randomName}${extname(file.originalname)}`);
          return name;
        }
      })
    })
  )
  uploadQuestionImg(@UploadedFile() file: Express.Multer.File) {
    const imgPath = this.filesService.getAvatarPath(file.path);
    return this.filesService.createFile({
      name: file.filename,
      path: imgPath
    });
  }

  @Get('static/avatars/:fileId')
  async getAvatar(@Param('fileId') fileId: any, @Res() res): Promise<any> {
    return await res.sendFile(fileId, { root: 'static/avatars'});
  }

  @Get('static/questions/:fileId')
  async getCommonImg(@Param('fileId') fileId: any, @Res() res): Promise<any> {
    return await res.sendFile(fileId, { root: 'static/questions'});
  }
}