import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { TrackerTypeService } from './tracker-type.service';
import { CreateTrackerTypeDto } from './dto/create-tracker-type.dto';
import { UpdateTrackerTypeDto } from './dto/update-tracker-type.dto';

@Controller('tracker-type')
export class TrackerTypeController {
  constructor(private readonly trackerTypeService: TrackerTypeService) {}

  @Post()
  create(@Body() createTrackerTypeDto: CreateTrackerTypeDto) {
    return this.trackerTypeService.create(createTrackerTypeDto);
  }

  @Get()
  findAll() {
    return this.trackerTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trackerTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateTrackerTypeDto: UpdateTrackerTypeDto) {
    return this.trackerTypeService.update(id, updateTrackerTypeDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.trackerTypeService.remove(id);
  }
}
