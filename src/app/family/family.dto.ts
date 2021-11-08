import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, Length } from 'class-validator';

export class CreateFamilyCardDto {

    @IsNotEmpty({ message: 'Number KK required!' })
    @Length(16, 16, { message: 'Number KK must be 16 characters!' })
    number: string;

    @IsNotEmpty()
    head_of_family: string;

    @IsNotEmpty()
    rt_id: any;

    address: string;
    zip: string;
    print_date: Date;

}

export class UpdateFamilyCardDto extends PartialType(CreateFamilyCardDto) { }

export class QueryFamilyCardDto {

    page: number;
    limit: number;
    query_by: string;
    query_value: string;

}