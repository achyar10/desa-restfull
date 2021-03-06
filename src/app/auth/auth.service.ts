import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import BaseService from '../../base.service';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import { LoginAuthDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ResponseData } from '../../interfaces/response';
import Helper from '../../utilities/authentication';
import { User } from '../user/user.entity';
const ImageKit = require('imagekit');

@Injectable()
export class AuthService extends BaseService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService
  ) {
    super()
  }

  async login(dto: LoginAuthDto): Promise<ResponseData> {

    // Check Username
    const check = await this.usersRepository.findOne({
      where: { username: dto.username, is_active: true },
    })
    if (!check) throw new UnauthorizedException('User tidak terdaftar atau belum aktif!');

    // Compare Password
    const valid = await Helper.compare(dto.password, check.password)
    if (!valid) throw new UnauthorizedException('Password salah!');

    const payload: object = {
      user_id: check.id,
      role: check.role,
      fullname: check.fullname,
    }
    const access_token = this.jwtService.sign(payload)

    return this._success(HttpStatus.OK, 'Login Succeeded', { ...payload, access_token })

  }

  imageKitAuth() {
    const imagekit = new ImageKit({
      urlEndpoint: `${process.env.IMAGEKIT_ENDPOINT}`,
      publicKey: `${process.env.IMAGEKIT_PUBKEY}`,
      privateKey: `${process.env.IMAGEKIT_PRVKEY}`,
    });
    const result = imagekit.getAuthenticationParameters();
    return result
  }


}
