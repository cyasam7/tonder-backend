import { Injectable } from '@nestjs/common';
import { IUserBase, UserMapper } from 'src/auth/mappers/user.mapper';
import { MatchDocument } from '../schema/match';

export interface IMatchBase {
  id: string;
  user: IUserBase;
}

@Injectable()
export class MatchMapper {
  constructor(private userMapper: UserMapper) {}

  mapTo(match: MatchDocument, userId: string): IMatchBase {
    const user = match.users.filter((user) => user._id !== userId)[0];

    return {
      id: match._id.toString(),
      user: this.userMapper.mapTo(user),
    };
  }
}
