import { Injectable } from '@nestjs/common';
import { IUserBase, UserMapper } from 'src/auth/mappers/user.mapper';
import { UserRepository } from 'src/auth/repositories/user.repository';
import { MatchRepository } from '../repository/match.repository';

@Injectable()
export class MatchService {
  constructor(
    private matchRepository: MatchRepository,
    private userRepository: UserRepository,
    private userMapper: UserMapper,
  ) {}

  async getListByUser(id: string): Promise<IUserBase[]> {
    const matches = await this.matchRepository.listByUser(id);
    const sumMatches = matches
      .flatMap((match) => match.users)
      .flatMap((user: any) =>
        user._id.toString() !== id ? user._id.toString() : [],
      );

    const matchesFiltered = await this.userRepository.listFiltered([
      ...sumMatches,
      id,
    ]);
    return matchesFiltered.map((user) => this.userMapper.mapTo(user));
  }
}
