import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';

export class CreateRelationshipDto {

    @IsNotEmpty({ message: 'Name required!' })
    name: string;

}

export class UpdateRelationshipDto extends PartialType(CreateRelationshipDto) { }

export class QueryRelationshipDto {

    page: number;
    limit: number;
    query_by: string;
    query_value: string;

}