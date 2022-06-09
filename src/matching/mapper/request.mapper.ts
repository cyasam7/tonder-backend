import { Injectable } from '@nestjs/common';
import { IUserBase, UserMapper } from 'src/auth/mappers/user.mapper';
import { RequestDocument } from '../schema/request';

export interface IRequestBase {
  user: IUserBase;
  userRequesed: IUserBase;
}

@Injectable()
export class RequestMapper {
  constructor(private userMapper: UserMapper) {}

  mapTo(data: RequestDocument): IRequestBase {
    return {
      user: this.userMapper.mapTo(data.user),
      userRequesed: this.userMapper.mapTo(data.userRequesed),
    };
  }
}
