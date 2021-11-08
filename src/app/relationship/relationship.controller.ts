import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../utilities/guards/jwt-guard.guard';
import { RelationshipService } from './relationship.service';
import { QueryRelationshipDto, CreateRelationshipDto, UpdateRelationshipDto } from './relationship.dto';

@Controller('relationship')
@UseGuards(JwtAuthGuard)
export class RelationshipController {

    constructor(private readonly relationshipService: RelationshipService) { }

    @Get()
    findAll(@Query() query: QueryRelationshipDto) {
        return this.relationshipService.findAll(query);
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.relationshipService.findOne(id);
    }

    @Post()
    async create(@Body() dto: CreateRelationshipDto) {
        return await this.relationshipService.create(dto)
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateRelationshipDto) {
        return await this.relationshipService.update(+id, dto)
    }

}
