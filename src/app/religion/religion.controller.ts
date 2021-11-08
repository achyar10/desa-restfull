import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../utilities/guards/jwt-guard.guard';
import { ReligionService } from './religion.service';
import { QueryReligionDto, CreateReligionDto, UpdateReligionDto } from './religion.dto';

@Controller('religion')
@UseGuards(JwtAuthGuard)
export class ReligionController {

    constructor(private readonly religionService: ReligionService) { }

    @Get()
    findAll(@Query() query: QueryReligionDto) {
        return this.religionService.findAll(query);
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.religionService.findOne(id);
    }

    @Post()
    async create(@Body() dto: CreateReligionDto) {
        return await this.religionService.create(dto)
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateReligionDto) {
        return await this.religionService.update(+id, dto)
    }

}
