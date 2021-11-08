import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../utilities/guards/jwt-guard.guard';
import { RtService } from './rt.service';
import { QueryRtDto, CreateRtDto, UpdateRtDto } from './rt.dto';

@Controller('rt')
@UseGuards(JwtAuthGuard)
export class RtController {

    constructor(private readonly rtService: RtService) { }

    @Get()
    findAll(@Query() query: QueryRtDto) {
        return this.rtService.findAll(query);
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.rtService.findOne(id);
    }

    @Post()
    async create(@Body() dto: CreateRtDto) {
        return await this.rtService.create(dto)
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateRtDto) {
        return await this.rtService.update(+id, dto)
    }

}
