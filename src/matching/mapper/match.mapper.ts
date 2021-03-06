import { Injectable } from '@nestjs/common';
import { IUserBase, UserMapper } from 'src/auth/mappers/user.mapper';
import { MatchDocument } from '../schema/match';

export interface IMatchBase {
  id: string;
  users: IUserBase[];
}

@Injectable()
export class MatchMapper {
  constructor(private userMapper: UserMapper) {}

  mapTo(match: MatchDocument): IMatchBase {
    return {
      id: match._id.toString(),
      users: match.users.map((user) => this.userMapper.mapTo(user)),
    };
  }
}
