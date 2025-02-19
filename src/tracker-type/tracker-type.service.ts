import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackerTypeDto } from './dto/create-tracker-type.dto';
import { UpdateTrackerTypeDto } from './dto/update-tracker-type.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrackerTypeService {
  constructor (
    private readonly prismaS:PrismaService,
  ){}
  
  async create(createTrackerTypeDto: CreateTrackerTypeDto) {
    const { folderId, name } = createTrackerTypeDto;
    await this.verifyIfExisitsFolderById(folderId);
    await this.verifyIfExists(name, folderId);

    return this.prismaS.trackerType.create({
      data:createTrackerTypeDto
    });
  }

  findAll() {
    return this.prismaS.trackerType.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} trackerType`;
  }

  async update(id: number, updateTrackerTypeDto: UpdateTrackerTypeDto) {
    const { folderId, name } = updateTrackerTypeDto;
    await this.verifyIfExistsById(id);
    await this.verifyIfExists(name, folderId);
    return this.prismaS.trackerType.update({
      where:{id},
      data:{name}
    });
  }

  async remove(id: number) {
    await this.verifyIfExistsById(id);
    return this.prismaS.trackerType.delete({
      where:{id}
    });
  }

  async verifyIfExists(name:string, folderId:number) {
    const find = await this.prismaS.trackerType.count({
      where:{
        name,
        folderId
      }
    });
    if(find) throw new ConflictException('Tracker já existe nessa pasta');
  }

  async verifyIfExistsById(id:number) {
    const find = await this.prismaS.trackerType.count({
      where:{id}
    });
    if(!find) throw new NotFoundException('Tracker inexistente');
  }

  async verifyIfExisitsFolderById(id:number) {
    const find = await this.prismaS.folder.count({
      where:{id}
    });
    if(!find) throw new NotFoundException('Pasta não existente');
  }
}
