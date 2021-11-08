import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import BaseService from '../../base.service';
import { Repository } from 'typeorm';
import { Marital } from './marital.entity';
import { CreateMaritalDto, QueryMaritalDto, UpdateMaritalDto } from './marital.dto';
import { ResponseData } from '../../interfaces/response';

@Injectable()
export class MaritalService extends BaseService {

    constructor(
        @InjectRepository(Marital)
        private readonly maritalRepository: Repository<Marital>,
    ) { super() }

    async findAll(query: QueryMaritalDto): Promise<ResponseData> {
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
            order: { name: "ASC" }
        }
        if (page && limit) {
            options = {
                ...options,
                skip: (Number(page) - 1) * Number(limit),
                take: Number(limit),
            }
        }
        const [result, total] = await this.maritalRepository.findAndCount(options);
        const data = {
            rows: result,
            pages: Math.ceil(total / Number(limit)),
            total
        }
        return this._success(HttpStatus.OK, 'OK', data.rows, Number(page), Number(limit), data.total, data.pages)
    }

    async findOne(id: number): Promise<ResponseData> {
        const data = await this.maritalRepository.findOne(id);
        return this._success(HttpStatus.OK, 'OK', data)
    }

    async create(dto: CreateMaritalDto): Promise<ResponseData> {
        const data = new Marital()
        data.name = dto.name
        const save = await this.maritalRepository.save(data)
        return this._success(HttpStatus.CREATED, 'Data has been saved', save);
    }

    async update(id: number, data: UpdateMaritalDto): Promise<ResponseData> {
        const check = await this.maritalRepository.findOne(id)
        if (!check) throw new HttpException('Data not found!', HttpStatus.NOT_FOUND);

        const save = await this.maritalRepository.save({ ...data, id: id })
        return this._success(HttpStatus.OK, 'Data has been updated', save);
    }

}
