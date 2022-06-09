import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DTOCreateUser } from '../dto/create-user.dto';
import { UserDocument } from '../schema/user.schema';
import { JwtService } from '@nestjs/jwt';
import { ERoles } from '../../components/decorators/role.decorator';
import { IUserBase, UserMapper } from '../mappers/user.mapper';
import { IRefreshTokenResponse } from '../types';
import { UserRepository } from '../repositories/user.repository';
import * as bcrypt from 'bcrypt';

export interface ILoginRespose {
  user: IUserBase;
  token: string;
  refreshToken: string;
}
export interface IPayloadToken {
  sub: string;
  role: ERoles;
}
@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private userMapper: UserMapper,
  ) {}

  async register(data: DTOCreateUser): Promise<IUserBase> {
    const user: DTOCreateUser = {
      ...data,
      password: bcrypt.hashSync(data.password, 10),
    };
    const newUser = await this.userRepository.create(user);
    return this.userMapper.mapTo(newUser);
  }

  async login(user: UserDocument): Promise<ILoginRespose> {
    const payload: IPayloadToken = {
      sub: user._id,
      role: user.role,
    };
    const token = this.jwtService.sign(payload, {
      expiresIn: '15s',
    });
    const refreshToken = this.jwtService.sign({ sub: user._id });

    user.refreshToken = refreshToken;
    user.accessToken = token;

    await user.save();

    return {
      token,
      refreshToken,
      user: this.userMapper.mapTo(user),
    };
  }

  async refreshToken(refreshToken: string): Promise<IRefreshTokenResponse> {
    const user = await this.userRepository.findOne({ refreshToken });

    if (!user) {
      throw new UnauthorizedException('Refresh token no valido');
    }

    const payload: IPayloadToken = {
      sub: user.id,
      role: user.role,
    };
    const token = this.jwtService.sign(payload, {
      expiresIn: '15s',
    });

    user.accessToken = token;

    await user.save();

    return {
      token,
    };
  }

  whoAmI(user: UserDocument): IUserBase {
    const mappedUser = this.userMapper.mapTo(user);
    return mappedUser;
  }
}
