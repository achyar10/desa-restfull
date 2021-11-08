import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../utilities/guards/jwt-guard.guard';
import { FamilyCardService } from './family.service';
import { QueryFamilyCardDto, CreateFamilyCardDto, UpdateFamilyCardDto } from './family.dto';

@Controller('family')
@UseGuards(JwtAuthGuard)
export class FamilyCardController {

    constructor(private readonly familyService: FamilyCardService) { }

    @Get()
    findAll(@Query() query: QueryFamilyCardDto) {
        return this.familyService.findAll(query);
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.familyService.findOne(id);
    }

    @Post()
    async create(@Body() dto: CreateFamilyCardDto) {
        return await this.familyService.create(dto)
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateFamilyCardDto) {
        return await this.familyService.update(+id, dto)
    }

}
