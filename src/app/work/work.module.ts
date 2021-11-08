import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkController } from './work.controller';
import { Work } from './work.entity';
import { WorkService } from './work.service';

@Module({
  imports: [TypeOrmModule.forFeature([Work])],
  exports: [TypeOrmModule],
  controllers: [WorkController],
  providers: [WorkService]
})
export class WorkModule {}
