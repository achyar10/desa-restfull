import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import BaseService from '../../base.service';
import { Repository } from 'typeorm';
import { Rt } from './rt.entity';
import { CreateRtDto, QueryRtDto, UpdateRtDto } from './rt.dto';
import { ResponseData } from '../../interfaces/response';

@Injectable()
export class RtService extends BaseService {

    constructor(
        @InjectRepository(Rt)
        private readonly rtRepository: Repository<Rt>,
    ) { super() }
    
    async findAll(query: QueryRtDto): Promise<ResponseData> {
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
        const [result, total] = await this.rtRepository.findAndCount(options);
        const data = {
            rows: result,
            pages: Math.ceil(total / Number(limit)),
            total
        }
        return this._success(HttpStatus.OK, 'OK', data.rows, Number(page), Number(limit), data.total, data.pages)
    }

    async findOne(id: number): Promise<ResponseData> {
        const data = await this.rtRepository.findOne(id);
        return this._success(HttpStatus.OK, 'OK', data)
    }

    async create(dto: CreateRtDto): Promise<ResponseData> {
        const data = new Rt()
        data.number = dto.number
        data.pic = dto.pic
        data.phone = dto.phone
        const save = await this.rtRepository.save(data)
        return this._success(HttpStatus.CREATED, 'Data has been saved', save);
    }

    async update(id: number, data: UpdateRtDto): Promise<ResponseData> {
        const check = await this.rtRepository.findOne(id)
        if (!check) throw new HttpException('Data not found!', HttpStatus.NOT_FOUND);

        const save = await this.rtRepository.save({ ...data, id: id })
        return this._success(HttpStatus.OK, 'Data has been updated', save);
    }

}
