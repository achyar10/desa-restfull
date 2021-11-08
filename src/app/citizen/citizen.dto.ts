import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, Length } from 'class-validator';

export class CreateCitizenDto {

    @IsNotEmpty({ message: 'NIK required!' })
    @Length(16, 16, { message: 'NIK must be 16 characters long!' })
    nik: string;

    @IsNotEmpty({ message: 'Name required!' })
    name: string;

    @IsNotEmpty({ message: 'Address required!' })
    address: string;

    @IsNotEmpty()
    gender: string;
    
    @IsNotEmpty()
    place_of_birth: string;
    
    @IsNotEmpty()
    date_of_birth: Date;

    @IsNotEmpty()
    blood_type: any;

    @IsNotEmpty()
    family_card: any;

    @IsNotEmpty()
    relationship: any;

    @IsNotEmpty()
    education: any;

    @IsNotEmpty()
    religion: any;

    @IsNotEmpty()
    marital_status: any;

    @IsNotEmpty()
    work: any;

    password: string;

}

export class UpdateCitizenDto extends PartialType(CreateCitizenDto) { }

export class QueryCitizenDto {

    page: number;
    limit: number;
    query_by: string;
    query_value: string;

}