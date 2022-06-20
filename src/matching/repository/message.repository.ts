import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message, MessageDocument } from '../schema/Message';
import { Model } from 'mongoose';
import { DTOCreateMessage } from '../dto/message.dto';
import * as mongoose from 'mongoose';
@Injectable()
export class MessageRepository {
  constructor(@InjectModel(Message.name) private MessageMode: Model<Message>) {}

  async create(data: DTOCreateMessage): Promise<MessageDocument> {
    const message = await this.MessageMode.create(data);
    return await message.populate([
      {
        path: 'user',
      },
      {
        path: 'match',
      },
    ]);
  }

  async listByMatch(id: string): Promise<MessageDocument[]> {
    return await this.MessageMode.find({ match: id });
  }
  async existByMatchId(id: string): Promise<boolean> {
    const count = await this.MessageMode.count({
      match: id,
    });
    return count > 0;
  }
}
