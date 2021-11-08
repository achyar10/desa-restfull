import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import BaseService from '../../base.service';
import { Repository } from 'typeorm';
import { Setting } from './setting.entity';
import { CreateSettingDto, QuerySettingDto, UpdateSettingDto } from './setting.dto';
import { ResponseData } from '../../interfaces/response';

@Injectable()
export class SettingService extends BaseService {

    constructor(
        @InjectRepository(Setting)
        private readonly settingRepository: Repository<Setting>,
    ) { super() }

    async findAll(query: QuerySettingDto): Promise<ResponseData> {
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
        const [result, total] = await this.settingRepository.findAndCount(options);
        const data = {
            rows: result,
            pages: Math.ceil(total / Number(limit)),
            total
        }
        return this._success(HttpStatus.OK, 'OK', data.rows, Number(page), Number(limit), data.total, data.pages)
    }

    async findOne(id: number): Promise<ResponseData> {
        const data = await this.settingRepository.findOne(id);
        return this._success(HttpStatus.OK, 'OK', data)
    }

    async create(dto: CreateSettingDto): Promise<ResponseData> {
        const data = new Setting()
        data.name = dto.name
        data.phone = dto.phone
        data.pic = dto.pic
        data.pic_photo = dto.pic_photo
        data.email = dto.email
        data.address = dto.address
        data.village = dto.village
        data.sub_district = dto.sub_district
        data.city = dto.city
        data.province = dto.province
        data.zip = dto.zip
        data.latitude = dto.latitude
        data.longitude = dto.longitude
        data.vision = dto.vision
        data.mision = dto.mision
        data.about = dto.about
        data.logo = dto.logo
        const save = await this.settingRepository.save(data)
        return this._success(HttpStatus.CREATED, 'Data has been saved', save);
    }

    async update(id: number, data: UpdateSettingDto): Promise<ResponseData> {
        const check = await this.settingRepository.findOne(id)
        if (!check) throw new HttpException('Data not found!', HttpStatus.NOT_FOUND);

        const save = await this.settingRepository.save({ ...data, id: id })
        return this._success(HttpStatus.OK, 'Data has been updated', save);
    }

}
