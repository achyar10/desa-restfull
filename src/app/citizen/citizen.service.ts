import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import BaseService from '../../base.service';
import { Repository } from 'typeorm';
import { Citizen } from './citizen.entity';
import { CreateCitizenDto, QueryCitizenDto, UpdateCitizenDto } from './citizen.dto';
import { ResponseData } from '../../interfaces/response';
import Helper from '../../utilities/authentication';
import * as moment from 'moment';

@Injectable()
export class CitizenService extends BaseService {

    constructor(
        @InjectRepository(Citizen)
        private readonly citizenRepository: Repository<Citizen>,
    ) { super() }

    async findAll(query: QueryCitizenDto): Promise<ResponseData> {
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
        const [result, total] = await this.citizenRepository.findAndCount(options);
        const data = {
            rows: result,
            pages: Math.ceil(total / Number(limit)),
            total
        }
        return this._success(HttpStatus.OK, 'OK', data.rows, Number(page), Number(limit), data.total, data.pages)
    }

    async findOne(id: number): Promise<ResponseData> {
        const data = await this.citizenRepository.findOne(id);
        return this._success(HttpStatus.OK, 'OK', data)
    }

    async create(dto: CreateCitizenDto): Promise<ResponseData> {
        const data = new Citizen()
        const parseDob = moment(dto.date_of_birth).format('DDMMYYYY')

        data.nik = dto.nik
        data.password = await Helper.hashing(parseDob)
        data.name = dto.name.toUpperCase()
        data.address = dto.address.toUpperCase()
        data.gender = dto.gender
        data.place_of_birth = dto.place_of_birth.toUpperCase()
        data.date_of_birth = dto.date_of_birth
        data.blood_type = dto.blood_type
        data.family_card = dto.family_card
        data.relationship = dto.relationship
        data.education = dto.education
        data.religion = dto.religion
        data.marital_status = dto.marital_status
        data.work = dto.work
        const save = await this.citizenRepository.save(data)
        return this._success(HttpStatus.CREATED, 'Data has been saved', save);
    }

    async update(id: number, data: UpdateCitizenDto): Promise<ResponseData> {
        const check = await this.citizenRepository.findOne(id)
        if (!check) throw new HttpException('Data not found!', HttpStatus.NOT_FOUND);

        const save = await this.citizenRepository.save({ ...data, id: id })
        return this._success(HttpStatus.OK, 'Data has been updated', save);
    }

}
