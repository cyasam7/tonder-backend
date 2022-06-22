import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/auth/repositories/user.repository';
import { DTOCreateMessage } from '../dto/message.dto';
import { IMessageBase, MessageMapper } from '../mapper/message.mapper';
import { MatchRepository } from '../repository/match.repository';
import { MessageRepository } from '../repository/message.repository';

@Injectable()
export class MessageService {
  constructor(
    private messageRepository: MessageRepository,
    private messageMapper: MessageMapper,
    private userRepository: UserRepository,
    private matchRepository: MatchRepository,
  ) {}

  async create(data: DTOCreateMessage): Promise<IMessageBase> {
    const user = await this.userRepository.findById(data.user);

    if (!user) {
      throw new ConflictException('No existe usuario con este id');
    }
    const match = await this.matchRepository.findById(data.match);

    if (!match) {
      throw new ConflictException('No existe match con este id');
    }

    const message = await this.messageRepository.create(data);
    return this.messageMapper.mapTo(message);
  }

  async listByMatch(matchId: string): Promise<IMessageBase[]> {
    const messages = await this.messageRepository.listByMatch(matchId);
    return messages.map((i) => this.messageMapper.mapTo(i));
  }
}
