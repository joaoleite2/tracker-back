import { Module } from '@nestjs/common';
import { FoldersModule } from './folders/folders.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [FoldersModule, FileModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
