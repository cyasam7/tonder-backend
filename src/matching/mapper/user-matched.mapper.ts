import { Injectable } from '@nestjs/common';
import { IUserBase, UserMapper } from 'src/auth/mappers/user.mapper';
import { MatchDocument } from '../schema/match';
export interface IUserMatchedBase {
  id: string;
  user: IUserBase;
}

@Injectable()
export class UserMatchedMapper {
  constructor(private userMapper: UserMapper) {}

  mapTo(match: MatchDocument, userId: string): IUserMatchedBase {
    const user = match.users.filter(
      (user) => user._id.toString() !== userId,
    )[0];
    return {
      id: match._id.toString(),
      user: this.userMapper.mapTo(user),
    };
  }
}
