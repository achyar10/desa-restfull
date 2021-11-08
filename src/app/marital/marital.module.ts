import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaritalController } from './marital.controller';
import { Marital } from './marital.entity';
import { MaritalService } from './marital.service';

@Module({
  imports: [TypeOrmModule.forFeature([Marital])],
  exports: [TypeOrmModule],
  controllers: [MaritalController],
  providers: [MaritalService]
})
export class MaritalModule {}
