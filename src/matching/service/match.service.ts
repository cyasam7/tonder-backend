import { Injectable } from '@nestjs/common';
import { IUserBase, UserMapper } from 'src/auth/mappers/user.mapper';
import { UserRepository } from 'src/auth/repositories/user.repository';
import { IMatchBase, MatchMapper } from '../mapper/match.mapper';
import {
  IUserMatchedBase,
  UserMatchedMapper,
} from '../mapper/user-matched.mapper';
import { MatchRepository } from '../repository/match.repository';
import { MessageRepository } from '../repository/message.repository';
import { MatchDocument } from '../schema/match';

@Injectable()
export class MatchService {
  constructor(
    private matchRepository: MatchRepository,
    private userRepository: UserRepository,
    private messageRepository: MessageRepository,
    private userMapper: UserMapper,
    private matchMapper: MatchMapper,
    private userMatchedMapper: UserMatchedMapper,
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
  async getListMatches(id: string): Promise<IUserMatchedBase[]> {
    const matches = await this.matchRepository.listByUser(id);
    const promises = matches.flatMap(async (match) => {
      const userOne = await this.messageRepository.existByUser(
        match.users[0]._id,
      );
      const userTwo = await this.messageRepository.existByUser(
        match.users[1]._id,
      );
      return userOne || userTwo ? [] : [match];
    });

    const matchesfiltered = (await Promise.all(promises)).flat();

    const haveMatches = !!matchesfiltered.length;

    return haveMatches
      ? matchesfiltered.map((i) => this.userMatchedMapper.mapTo(i, id))
      : [];
  }

  async getListChatByMatch(id: string): Promise<IUserMatchedBase[]> {
    const matches = await this.matchRepository.listByUser(id);
    const promises = matches.flatMap(async (match) => {
      const userOne = await this.messageRepository.existByUser(
        match.users[0]._id,
      );
      const userTwo = await this.messageRepository.existByUser(
        match.users[1]._id,
      );
      return userOne || userTwo ? [match] : [];
    });

    const matchesfiltered = (await Promise.all(promises)).flat();

    const haveMatches = !!matchesfiltered.length;

    return haveMatches
      ? matchesfiltered.map((i) => this.userMatchedMapper.mapTo(i, id))
      : [];
  }
}
