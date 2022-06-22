import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DTOCreateMessage } from '../dto/message.dto';
import { IMessageBase } from '../mapper/message.mapper';
import { MessageService } from '../service/message.service';

@Controller('/message')
@ApiTags('Messages')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Post('/')
  async createMessage(@Body() body: DTOCreateMessage): Promise<IMessageBase> {
    return await this.messageService.create(body);
  }

  @Get('/match/:id')
  async getListMessageByMatch(
    @Param('id') id: string,
  ): Promise<IMessageBase[]> {
    return await this.messageService.listByMatch(id);
  }
}
