import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../utilities/guards/jwt-guard.guard';
import { SettingService } from './setting.service';
import { QuerySettingDto, CreateSettingDto, UpdateSettingDto } from './setting.dto';

@Controller('setting')
@UseGuards(JwtAuthGuard)
export class SettingController {

    constructor(private readonly settingService: SettingService) { }

    @Get()
    findAll(@Query() query: QuerySettingDto) {
        return this.settingService.findAll(query);
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.settingService.findOne(id);
    }

    @Post()
    async create(@Body() dto: CreateSettingDto) {
        return await this.settingService.create(dto)
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateSettingDto) {
        return await this.settingService.update(+id, dto)
    }

}
