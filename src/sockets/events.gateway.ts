import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(81, {
  cors: { origin: '*' },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  handleDisconnect(client: Socket): void {
    console.log('Desconectando: ', client.id);
  }

  handleConnection(client: Socket, ...args: any[]): void {
    console.log('Conectando: ', client.id);
  }

  @SubscribeMessage('join')
  joinSession(
    @MessageBody() data: string,
    @ConnectedSocket() socket: Socket,
  ): void {
    console.log('join', data);
    socket.join(data);
  }

  @SubscribeMessage('message')
  handleIncommingMessage(
    @MessageBody() { room, message }: { message: string; room: string },
  ): void {
    this.server.to(room).emit('new_message', message.toString());
  }
}
