import { Module } from '@nestjs/common';
import { ManualOrderFilesService } from './manual-order-files.service';
import { ManualOrderFilesController } from './manual-order-files.controller';

@Module({
  providers: [ManualOrderFilesService],
  controllers: [ManualOrderFilesController]
})
export class ManualOrderFilesModule {}
