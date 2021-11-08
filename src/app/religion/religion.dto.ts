import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';

export class CreateReligionDto {

    @IsNotEmpty({ message: 'Name required!' })
    name: string;

}

export class UpdateReligionDto extends PartialType(CreateReligionDto) { }

export class QueryReligionDto {

    page: number;
    limit: number;
    query_by: string;
    query_value: string;

}