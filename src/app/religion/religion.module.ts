import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReligionController } from './religion.controller';
import { Religion } from './religion.entity';
import { ReligionService } from './religion.service';

@Module({
  imports: [TypeOrmModule.forFeature([Religion])],
  exports: [TypeOrmModule],
  controllers: [ReligionController],
  providers: [ReligionService]
})
export class ReligionModule {}
