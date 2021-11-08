import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../utilities/guards/jwt-guard.guard';
import { RwService } from './rw.service';
import { QueryRwDto, CreateRwDto, UpdateRwDto } from './rw.dto';

@Controller('rw')
@UseGuards(JwtAuthGuard)
export class RwController {

    constructor(private readonly rwService: RwService) { }

    @Get()
    findAll(@Query() query: QueryRwDto) {
        return this.rwService.findAll(query);
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.rwService.findOne(id);
    }

    @Post()
    async create(@Body() dto: CreateRwDto) {
        return await this.rwService.create(dto)
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateRwDto) {
        return await this.rwService.update(+id, dto)
    }

}
