import { Injectable } from '@nestjs/common';
import { MessageDocument } from '../schema/message';

export interface IMessageBase {
  id: string;
  match: string;
  user: string;
  message: string;
  time: string;
}

@Injectable()
export class MessageMapper {
  mapTo(data: MessageDocument): IMessageBase {
    return {
      id: data._id.toString(),
      match: data.match._id.toString(),
      user: data.user._id.toString(),
      message: data.message.toString(),
      time: '',
    };
  }
}
