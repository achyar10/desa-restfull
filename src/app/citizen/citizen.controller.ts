import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../utilities/guards/jwt-guard.guard';
import { CitizenService } from './citizen.service';
import { QueryCitizenDto, CreateCitizenDto, UpdateCitizenDto } from './citizen.dto';

@Controller('citizen')
@UseGuards(JwtAuthGuard)
export class CitizenController {

    constructor(private readonly citizenService: CitizenService) { }

    @Get()
    findAll(@Query() query: QueryCitizenDto) {
        return this.citizenService.findAll(query);
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.citizenService.findOne(id);
    }

    @Post()
    async create(@Body() dto: CreateCitizenDto) {
        return await this.citizenService.create(dto)
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateCitizenDto) {
        return await this.citizenService.update(+id, dto)
    }

}
