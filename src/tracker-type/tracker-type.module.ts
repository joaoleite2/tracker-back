import { Module } from '@nestjs/common';
import { TrackerTypeService } from './tracker-type.service';
import { TrackerTypeController } from './tracker-type.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [TrackerTypeController],
  providers: [TrackerTypeService],
  imports: [PrismaModule]
})
export class TrackerTypeModule {}
