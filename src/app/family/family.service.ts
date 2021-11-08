import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import BaseService from '../../base.service';
import { Repository } from 'typeorm';
import { FamilyCard } from './family.entity';
import { CreateFamilyCardDto, QueryFamilyCardDto, UpdateFamilyCardDto } from './family.dto';
import { ResponseData } from '../../interfaces/response';

@Injectable()
export class FamilyCardService extends BaseService {

    constructor(
        @InjectRepository(FamilyCard)
        private readonly familyRepository: Repository<FamilyCard>,
    ) { super() }

    async findAll(query: QueryFamilyCardDto): Promise<ResponseData> {
        const { page, limit, query_by, query_value } = query

        let filter: any = {}
        if (query_by && query_value) {
            filter = {
                ...filter,
                [query_by]: query_value
            }
        }
        let options: any = {
            where: filter,
            order: { id: "DESC" }
        }
        if (page && limit) {
            options = {
                ...options,
                skip: (Number(page) - 1) * Number(limit),
                take: Number(limit),
            }
        }
        const [result, total] = await this.familyRepository.findAndCount(options);
        const data = {
            rows: result,
            pages: Math.ceil(total / Number(limit)),
            total
        }
        return this._success(HttpStatus.OK, 'OK', data.rows, Number(page), Number(limit), data.total, data.pages)
    }

    async findOne(id: number): Promise<ResponseData> {
        const data = await this.familyRepository.findOne(id);
        return this._success(HttpStatus.OK, 'OK', data)
    }

    async create(dto: CreateFamilyCardDto): Promise<ResponseData> {
        const data = new FamilyCard()
        data.number = dto.number
        data.head_of_family = dto.head_of_family
        data.zip = dto.zip
        data.address = dto.address
        data.print_date = dto.print_date
        data.rt = dto.rt_id
        const save = await this.familyRepository.save(data)
        return this._success(HttpStatus.CREATED, 'Data has been saved', save);
    }

    async update(id: number, data: UpdateFamilyCardDto): Promise<ResponseData> {
        const check = await this.familyRepository.findOne(id)
        if (!check) throw new HttpException('Data not found!', HttpStatus.NOT_FOUND);

        const save = await this.familyRepository.save({ ...data, id: id })
        return this._success(HttpStatus.OK, 'Data has been updated', save);
    }

}
