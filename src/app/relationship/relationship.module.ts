import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelationshipController } from './relationship.controller';
import { Relationship } from './relationship.entity';
import { RelationshipService } from './relationship.service';

@Module({
  imports: [TypeOrmModule.forFeature([Relationship])],
  exports: [TypeOrmModule],
  controllers: [RelationshipController],
  providers: [RelationshipService]
})
export class RelationshipModule {}
