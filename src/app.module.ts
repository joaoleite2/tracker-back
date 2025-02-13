import { Module } from '@nestjs/common';
import { FoldersModule } from './folders/folders.module';

@Module({
  imports: [FoldersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
