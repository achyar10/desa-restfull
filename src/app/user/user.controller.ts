import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../utilities/guards/jwt-guard.guard';
import { QueryUserDto, CreateUserDto, UpdateuserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Get()
    findAll(@Query() query: QueryUserDto) {
        return this.userService.findAll(query);
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.userService.findOne(id);
    }

    @Post()
    async create(@Body() dto: CreateUserDto) {
        return await this.userService.create(dto)
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateuserDto) {
        return await this.userService.update(+id, dto)
    }

}
