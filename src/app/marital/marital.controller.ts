import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../utilities/guards/jwt-guard.guard';
import { MaritalService } from './marital.service';
import { QueryMaritalDto, CreateMaritalDto, UpdateMaritalDto } from './marital.dto';

@Controller('marital')
@UseGuards(JwtAuthGuard)
export class MaritalController {

    constructor(private readonly maritalService: MaritalService) { }

    @Get()
    findAll(@Query() query: QueryMaritalDto) {
        return this.maritalService.findAll(query);
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.maritalService.findOne(id);
    }

    @Post()
    async create(@Body() dto: CreateMaritalDto) {
        return await this.maritalService.create(dto)
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateMaritalDto) {
        return await this.maritalService.update(+id, dto)
    }

}
