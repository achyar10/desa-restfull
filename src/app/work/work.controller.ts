import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../utilities/guards/jwt-guard.guard';
import { WorkService } from './work.service';
import { QueryWorkDto, CreateWorkDto, UpdateWorkDto } from './work.dto';

@Controller('work')
@UseGuards(JwtAuthGuard)
export class WorkController {

    constructor(private readonly workService: WorkService) { }

    @Get()
    findAll(@Query() query: QueryWorkDto) {
        return this.workService.findAll(query);
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.workService.findOne(id);
    }

    @Post()
    async create(@Body() dto: CreateWorkDto) {
        return await this.workService.create(dto)
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateWorkDto) {
        return await this.workService.update(+id, dto)
    }

}
