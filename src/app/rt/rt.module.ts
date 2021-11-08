import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RtController } from './rt.controller';
import { RtService } from './rt.service';
import { Rt } from './rt.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rt])],
  exports: [TypeOrmModule],
  controllers: [RtController],
  providers: [RtService]
})
export class RtModule {}
