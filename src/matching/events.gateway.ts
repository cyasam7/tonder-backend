import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { DTOCreateMessage } from './dto/message.dto';
import { DTOCreateRequest } from './dto/request.dto';
import { IMatchBase } from './mapper/match.mapper';
import { MessageService } from './service/message.service';
import { RequestService } from './service/request.service';

@WebSocketGateway(81, {
  cors: { origin: '*' },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private requestService: RequestService,
    private messageService: MessageService,
  ) {}

  @WebSocketServer() server: Server;

  handleDisconnect(client: Socket): void {
    console.log('Desconectando: ', client.id);
  }

  handleConnection(client: Socket): void {
    console.log('Conectando: ', client.id);
  }

  @SubscribeMessage('join')
  joinSession(
    @MessageBody() data: string,
    @ConnectedSocket() socket: Socket,
  ): void {
    socket.join(data);
  }

  @SubscribeMessage('left')
  leftSession(
    @MessageBody() id: string,
    @ConnectedSocket() socket: Socket,
  ): void {
    socket.leave(id);
  }

  @SubscribeMessage('message')
  async handleIncommingMessage(
    @MessageBody()
    { room, message }: { message: DTOCreateMessage; room: string },
  ): Promise<void> {
    const newMessage = await this.messageService.create(message);
    this.server.to(room).emit('new_message', newMessage);
  }

  /* Matching */
  @SubscribeMessage('swipe')
  async handleSwipeCard(
    @MessageBody()
    data: DTOCreateRequest,
  ): Promise<IMatchBase | null> {
    return await this.requestService.createRequest(data);
  }
}
