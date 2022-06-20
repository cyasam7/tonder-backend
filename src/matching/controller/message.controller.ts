import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DTOCreateMessage } from '../dto/message.dto';
import { IMessageBase } from '../mapper/message.mapper';
import { MessageService } from '../service/message.service';

@Controller('/message')
@ApiTags('Messages')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Post('/')
  async getListUsersById(
    @Body() body: DTOCreateMessage,
  ): Promise<IMessageBase> {
    return await this.messageService.create(body);
  }
}
