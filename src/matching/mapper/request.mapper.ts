import { Injectable } from '@nestjs/common';
import { IUserBase, UserMapper } from 'src/auth/mappers/user.mapper';

export interface IRequestBase {
  user: IUserBase;
  userRequesed: IUserBase;
}

@Injectable()
export class RequestMapper {
  constructor(private userMapper: UserMapper) {}

  /* mapTo(data: RequestDocument): IRequestBase {
    return {
      userId: {},
    };
  } */
}
