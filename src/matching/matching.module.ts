import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { MatchController } from './controller/match.controller';
import { MessageController } from './controller/message.controller';
import { RequestController } from './controller/request.controller';
import { EventsGateway } from './events.gateway';
import { MatchMapper } from './mapper/match.mapper';
import { MessageMapper } from './mapper/message.mapper';
import { RequestMapper } from './mapper/request.mapper';
import { MatchRepository } from './repository/match.repository';
import { MessageRepository } from './repository/message.repository';
import { RequestRepository } from './repository/request.repository';
import { Match, MatchSchema } from './schema/match';
import { Message, MessageSchema } from './schema/message';
import { Request, RequestSchema } from './schema/request';
import { MatchService } from './service/match.service';
import { MessageService } from './service/message.service';
import { RequestService } from './service/request.service';

@Module({
  controllers: [RequestController, MatchController, MessageController],
  imports: [
    MongooseModule.forFeature([
      { schema: MatchSchema, name: Match.name },
      { schema: RequestSchema, name: Request.name },
      { schema: MessageSchema, name: Message.name },
    ]),
    AuthModule,
  ],
  providers: [
    EventsGateway,
    MatchRepository,
    RequestRepository,
    MatchService,
    RequestService,
    MatchMapper,
    RequestMapper,
    MessageRepository,
    MessageService,
    MessageMapper,
  ],
})
export class MatchingModule {}
