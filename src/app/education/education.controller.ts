import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../utilities/guards/jwt-guard.guard';
import { EducationService } from './education.service';
import { QueryEducationDto, CreateEducationDto, UpdateEducationDto } from './education.dto';

@Controller('education')
@UseGuards(JwtAuthGuard)
export class EducationController {

    constructor(private readonly educationService: EducationService) { }

    @Get()
    findAll(@Query() query: QueryEducationDto) {
        return this.educationService.findAll(query);
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.educationService.findOne(id);
    }

    @Post()
    async create(@Body() dto: CreateEducationDto) {
        return await this.educationService.create(dto)
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateEducationDto) {
        return await this.educationService.update(+id, dto)
    }

}
