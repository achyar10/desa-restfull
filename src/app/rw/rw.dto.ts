import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';

export class CreateRwDto {

    @IsNotEmpty({ message: 'Number required!' })
    number: string;

    @IsNotEmpty({ message: 'PIC required!' })
    pic: string;

    @IsNotEmpty({ message: 'Phone required!' })
    phone: string;

    @IsNotEmpty({ message: 'RW required!' })
    rw_id: number;

}

export class UpdateRwDto extends PartialType(CreateRwDto) { }

export class QueryRwDto {

    page: number;
    limit: number;
    query_by: string;
    query_value: string;

}