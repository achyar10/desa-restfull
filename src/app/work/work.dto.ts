import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';

export class CreateWorkDto {

    @IsNotEmpty({ message: 'Name required!' })
    name: string;

}

export class UpdateWorkDto extends PartialType(CreateWorkDto) { }

export class QueryWorkDto {

    page: number;
    limit: number;
    query_by: string;
    query_value: string;

}