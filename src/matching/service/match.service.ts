import { Injectable } from '@nestjs/common';
import { IUserBase, UserMapper } from 'src/auth/mappers/user.mapper';
import { UserRepository } from 'src/auth/repositories/user.repository';
import { IMatchBase, MatchMapper } from '../mapper/match.mapper';
import { MatchRepository } from '../repository/match.repository';
import { MessageRepository } from '../repository/message.repository';

@Injectable()
export class MatchService {
  constructor(
    private matchRepository: MatchRepository,
    private userRepository: UserRepository,
    private messageRepository: MessageRepository,
    private userMapper: UserMapper,
    private matchMapper: MatchMapper,
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
  async getListMatches(id: string): Promise<IMatchBase[]> {
    const matches = await this.matchRepository.listByUser(id);
    return matches.map((i) => this.matchMapper.mapTo(i, id));
  }

  async getListChatByMatch(id: string): Promise<IMatchBase[]> {
    const matches = await this.matchRepository.listByUser(id);
    const promises = matches.flatMap((match) =>
      this.messageRepository.existByMatchId(match._id) ? [match] : [],
    );
    const matchesfiltered = await Promise.all(promises);
    return matchesfiltered.map((i) => this.matchMapper.mapTo(i, id));
  }
}
