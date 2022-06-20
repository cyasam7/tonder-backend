import { Injectable } from '@nestjs/common';
import { DTOCreateMessage } from '../dto/message.dto';
import { IMessageBase, MessageMapper } from '../mapper/message.mapper';
import { MessageRepository } from '../repository/message.repository';

@Injectable()
export class MessageService {
  constructor(
    private messageRepository: MessageRepository,
    private messageMapper: MessageMapper,
  ) {}

  async create(data: DTOCreateMessage): Promise<IMessageBase> {
    const message = await this.messageRepository.create(data);
    console.log(message);

    return this.messageMapper.mapTo(message);
  }
}
