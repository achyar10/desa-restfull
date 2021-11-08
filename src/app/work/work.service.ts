import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import BaseService from '../../base.service';
import { Repository } from 'typeorm';
import { Work } from './work.entity';
import { CreateWorkDto, QueryWorkDto, UpdateWorkDto } from './work.dto';
import { ResponseData } from '../../interfaces/response';

@Injectable()
export class WorkService extends BaseService {

    constructor(
        @InjectRepository(Work)
        private readonly workRepository: Repository<Work>,
    ) { super() }

    async findAll(query: QueryWorkDto): Promise<ResponseData> {
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
        const [result, total] = await this.workRepository.findAndCount(options);
        const data = {
            rows: result,
            pages: Math.ceil(total / Number(limit)),
            total
        }
        return this._success(HttpStatus.OK, 'OK', data.rows, Number(page), Number(limit), data.total, data.pages)
    }

    async findOne(id: number): Promise<ResponseData> {
        const data = await this.workRepository.findOne(id);
        return this._success(HttpStatus.OK, 'OK', data)
    }

    async create(dto: CreateWorkDto): Promise<ResponseData> {
        const data = new Work()
        data.name = dto.name
        const save = await this.workRepository.save(data)
        return this._success(HttpStatus.CREATED, 'Data has been saved', save);
    }

    async update(id: number, data: UpdateWorkDto): Promise<ResponseData> {
        const check = await this.workRepository.findOne(id)
        if (!check) throw new HttpException('Data not found!', HttpStatus.NOT_FOUND);

        const save = await this.workRepository.save({ ...data, id: id })
        return this._success(HttpStatus.OK, 'Data has been updated', save);
    }

}
