import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FamilyCardController } from './family.controller';
import { FamilyCard } from './family.entity';
import { FamilyCardService } from './family.service';

@Module({
  imports: [TypeOrmModule.forFeature([FamilyCard])],
  exports: [TypeOrmModule],
  controllers: [FamilyCardController],
  providers: [FamilyCardService]
})
export class FamilyCardModule {}
