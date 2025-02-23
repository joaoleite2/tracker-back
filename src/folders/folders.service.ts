import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FoldersService {
  constructor(private readonly prismaS:PrismaService){}
  
  async create(createFolderDto: CreateFolderDto) {
    await this.verifyIfExisitsFolderByName(createFolderDto.name);
    console.log('pasta com o nome ', createFolderDto.name, ', criada');
    return this.prismaS.folder.create({
      data:createFolderDto
    });
  }

  findAll() {
    return this.prismaS.folder.findMany({
      include:{files:true}
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} folder`;
  }

  async update(id: number, updateFolderDto: UpdateFolderDto) {
    await this.verifyIfExisitsFolderById(id);
    await this.verifyIfExisitsFolderByName(updateFolderDto.name);
    return this.prismaS.folder.update({
      data:{
        name:updateFolderDto.name
      },
      where:{
        id
      }
    });
  }

  remove(id: number) {
    return `This action removes a #${id} folder`;
  }

  async verifyIfExisitsFolderByName(name:string){
    const find = await this.prismaS.folder.count({
      where:{name}
    });
    if(find) throw new ConflictException('Pasta já existente');
  }

  async verifyIfExisitsFolderById(id:number){
    const find = await this.prismaS.folder.count({
      where:{id}
    });
    if(!find) throw new NotFoundException('Pasta não existente');
  }
}
