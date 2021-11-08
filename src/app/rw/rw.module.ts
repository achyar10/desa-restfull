import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RwController } from './rw.controller';
import { RwService } from './rw.service';
import { Rw } from './rw.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rw])],
  exports: [TypeOrmModule],
  controllers: [RwController],
  providers: [RwService]
})
export class RwModule {}
