import { Injectable } from '@nestjs/common';
import { DTOCreateRequest } from '../dto/request.dto';
import { IMatchBase, MatchMapper } from '../mapper/match.mapper';
import { MatchRepository } from '../repository/match.repository';
import { RequestRepository } from '../repository/request.repository';

@Injectable()
export class RequestService {
  constructor(
    private requestRepository: RequestRepository,
    private matchRepository: MatchRepository,
    private matchMapper: MatchMapper,
  ) {}

  async createRequest({
    user,
    userRequesed,
    sent,
  }: DTOCreateRequest): Promise<IMatchBase | null> {
    if (!userRequesed) {
      return null;
    }

    const requestByOtherUser = await this.requestRepository.findOne({
      user: userRequesed,
      userRequesed: user,
      sent: true,
    });

    if (!requestByOtherUser) {
      await this.requestRepository.create({ user, userRequesed, sent });
      return null;
    }

    const match = await this.matchRepository.create({
      users: [user, userRequesed],
    });
    const matchMapped = this.matchMapper.mapTo(match, user);
    return matchMapped;
  }
}
