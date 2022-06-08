import { Injectable } from '@nestjs/common';
import { IUserBase } from 'src/auth/mappers/user.mapper';
import { DTOCreateMatch } from '../dto/match.dto';
import { DTOCreateRequest } from '../dto/request.dto';
import { IRequestBase, RequestMapper } from '../mapper/request.mapper';
import { MatchRepository } from '../repository/match.repository';
import { RequestRepository } from '../repository/request.repository';

export interface ICreateRequestResponse {
  user: IUserBase | null;
  matched: boolean;
}

@Injectable()
export class RequestService {
  constructor(
    private requestRepository: RequestRepository,
    private matchRepository: MatchRepository,
    private requestMapper: RequestMapper,
  ) {}

  async createRequest(data: DTOCreateRequest): Promise<ICreateRequestResponse> {
    const requestByOtherUser = await this.requestRepository.findOne({
      user: data.userRequesed,
      userRequesed: data.user,
    });
    console.log(requestByOtherUser);

    await this.requestRepository.create(data);

    if (requestByOtherUser) {
      await this.matchRepository.create({
        users: [data.user, data.userRequesed],
      });
    }
    return {
      user: /* requestByOtherUser ? requestByOtherUser :  */ null,
      matched: !!requestByOtherUser,
    };
  }
}
