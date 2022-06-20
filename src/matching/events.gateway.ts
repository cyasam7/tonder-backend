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
import { DTOCreateRequest } from './dto/request.dto';
import { IMatchBase } from './mapper/match.mapper';
import { RequestService } from './service/request.service';

@WebSocketGateway(81, {
  cors: { origin: '*' },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private requestService: RequestService) {}

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

  @SubscribeMessage('message')
  handleIncommingMessage(
    @MessageBody() { room, message }: { message: string; room: string },
  ): void {
    this.server.to(room).emit('new_message', message.toString());
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
