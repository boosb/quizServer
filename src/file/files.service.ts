import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateFileDto } from './dto/createFile.dto';
import { File } from './entities/file.entity';

const SERVER_URL='http://localhost:3000/files';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(File) private readonly fileRepository: Repository<File>,
  ) {}

  async createFile(createFileDto: CreateFileDto) {
    const existFile = await this.fileRepository.findOne({
      where: {
        name: createFileDto.name
      }
    });

    if(existFile) {
      throw new BadRequestException('A file with the same name already exists!');
    }

    const newFile = await this.fileRepository.save({
      name: createFileDto.name,
      path: createFileDto.path
    });

    return newFile;
  }

  getAvatarPath(oldPath: string) {
    const pathParts = oldPath.split('\\');
    return `${SERVER_URL}/${pathParts.join('/')}`;
  }
}