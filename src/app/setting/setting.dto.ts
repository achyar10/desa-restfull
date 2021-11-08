import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';

export class CreateSettingDto {

    @IsNotEmpty({ message: 'Name required!' })
    name: string;

    @IsNotEmpty({ message: 'Phone required!' })
    phone: string;

    @IsNotEmpty({ message: 'PIC required!' })
    pic: string;

    pic_photo: string;
    email: string;
    address: string;
    village: string;
    sub_district: string;
    city: string;
    province: string;
    zip: string;
    latitude: string;
    longitude: string;
    vision: string;
    mision: string;
    about: string;
    logo: string;

}

export class UpdateSettingDto extends PartialType(CreateSettingDto) { }

export class QuerySettingDto {

    page: number;
    limit: number;
    query_by: string;
    query_value: string;

}