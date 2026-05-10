import { Module } from '@nestjs/common';
import { MoodsService } from './moods.service';
import { MoodsController } from './moods.controller';

@Module({
  providers: [MoodsService],
  controllers: [MoodsController]
})
export class MoodsModule {}
