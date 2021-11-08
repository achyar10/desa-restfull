import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import BaseService from '../../base.service';
import { Repository } from 'typeorm';
import { Rw } from './rw.entity';
import { CreateRwDto, QueryRwDto, UpdateRwDto } from './rw.dto';
import { ResponseData } from '../../interfaces/response';

@Injectable()
export class RwService extends BaseService {

    constructor(
        @InjectRepository(Rw)
        private readonly rwRepository: Repository<Rw>,
    ) { super() }
    
    async findAll(query: QueryRwDto): Promise<ResponseData> {
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
            order: { number: "ASC" }
        }
        if (page && limit) {
            options = {
                ...options,
                skip: (Number(page) - 1) * Number(limit),
                take: Number(limit),
            }
        }
        const [result, total] = await this.rwRepository.findAndCount(options);
        const data = {
            rows: result,
            pages: Math.ceil(total / Number(limit)),
            total
        }
        return this._success(HttpStatus.OK, 'OK', data.rows, Number(page), Number(limit), data.total, data.pages)
    }

    async findOne(id: number): Promise<ResponseData> {
        const data = await this.rwRepository.findOne(id);
        return this._success(HttpStatus.OK, 'OK', data)
    }

    async create(dto: CreateRwDto): Promise<ResponseData> {
        const data = new Rw()
        data.number = dto.number
        data.pic = dto.pic
        data.phone = dto.phone
        const save = await this.rwRepository.save(data)
        return this._success(HttpStatus.CREATED, 'Data has been saved', save);
    }

    async update(id: number, data: UpdateRwDto): Promise<ResponseData> {
        const check = await this.rwRepository.findOne(id)
        if (!check) throw new HttpException('Data not found!', HttpStatus.NOT_FOUND);

        const save = await this.rwRepository.save({ ...data, id: id })
        return this._success(HttpStatus.OK, 'Data has been updated', save);
    }

}
