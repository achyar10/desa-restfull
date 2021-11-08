import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitizenController } from './citizen.controller';
import { Citizen } from './citizen.entity';
import { CitizenService } from './citizen.service';

@Module({
  imports: [TypeOrmModule.forFeature([Citizen])],
  exports: [TypeOrmModule],
  controllers: [CitizenController],
  providers: [CitizenService]
})
export class CitizenModule {}
