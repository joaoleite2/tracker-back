import { Module } from '@nestjs/common';
import { FoldersModule } from './folders/folders.module';
import { TrackerTypeModule } from './tracker-type/tracker-type.module';

@Module({
  imports: [FoldersModule, TrackerTypeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
