import { Injectable } from '@nestjs/common';
import { IUserBase, UserMapper } from 'src/auth/mappers/user.mapper';
import { MatchDocument } from '../schema/match';

export interface IMatchBase {
  users: IUserBase[];
}

@Injectable()
export class MatchMapper {
  constructor(private userMapper: UserMapper) {}

  mapTo(match: MatchDocument): IMatchBase {
    return {
      users: match.users.map((user) => this.userMapper.mapTo(user)),
    };
  }
}
