import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';

export class CreateRtDto {

    @IsNotEmpty({ message: 'Number required!' })
    number: string;

    @IsNotEmpty({ message: 'PIC required!' })
    pic: string;

    @IsNotEmpty({ message: 'Phone required!' })
    phone: string;

    @IsNotEmpty({ message: 'RW required!' })
    rw_id: number;

}

export class UpdateRtDto extends PartialType(CreateRtDto) { }

export class QueryRtDto {

    page: number;
    limit: number;
    query_by: string;
    query_value: string;

}