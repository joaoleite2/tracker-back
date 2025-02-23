import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FileService {
  constructor (
    private readonly prismaS:PrismaService,
  ){}
  
  async create(createFileDto: CreateFileDto) {
    const { folderId, name } = createFileDto;
    await this.verifyIfExisitsFolderById(folderId);
    await this.verifyIfExists(name, folderId);

    return this.prismaS.file.create({
      data:createFileDto
    });
  }

  findAll() {
    return this.prismaS.file.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} trackerType`;
  }

  async update(id: number, updateFileDto: UpdateFileDto) {
    const { folderId, name } = updateFileDto;
    await this.verifyIfExistsById(id);
    await this.verifyIfExists(name, folderId);
    return this.prismaS.file.update({
      where:{id},
      data:{name}
    });
  }

  async remove(id: number) {
    await this.verifyIfExistsById(id);
    return this.prismaS.file.delete({
      where:{id}
    });
  }

  async verifyIfExists(name:string, folderId:number) {
    const find = await this.prismaS.file.count({
      where:{
        name,
        folderId
      }
    });
    if(find) throw new ConflictException('File já existe nessa pasta');
  }

  async verifyIfExistsById(id:number) {
    const find = await this.prismaS.file.count({
      where:{id}
    });
    if(!find) throw new NotFoundException('File inexistente');
  }

  async verifyIfExisitsFolderById(id:number) {
    const find = await this.prismaS.folder.count({
      where:{id}
    });
    if(!find) throw new NotFoundException('Pasta não existente');
  }
}
