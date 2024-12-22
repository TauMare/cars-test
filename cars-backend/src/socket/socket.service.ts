import { forwardRef, Inject, Injectable } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { OrderService } from 'src/order/order.service';

@WebSocketGateway({ cors: true })
@Injectable()
export class SocketService implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private server: Server;

  constructor(@Inject(forwardRef(()=> OrderService)) 
  private orderService: OrderService) {

  }
  private clients = new Map<string, Socket>();

  handleConnection(client: Socket) {
    client.on('register', (uuid: string) => {
      this.clients.set(uuid, client);
    });
  }

  handleDisconnect(client: Socket) {
    for (const [uuid, socket] of this.clients.entries()) {
      if (socket.id === client.id) {
        this.clients.delete(uuid);
        break;
      }
    }
  }

  sendMessageToClient(uuid: string, message: any) {
    const client = this.clients.get(uuid);
    if (client) {
      client.emit('orderStatusUpdate', message);
    }
  }

  @SubscribeMessage('orderStatusRequest')
  async handleOrderStatusRequest(client: Socket, data: { uuid: string }) {
    const status = await this.orderService.getStatus(data.uuid);
    
    if (!this.clients.set(data.uuid, client)) {
      this.clients.set(data.uuid, client);
    };

    if(!status) {
      this.sendMessageToClient(data.uuid, { status: 'pending' }); return
    }
    this.sendMessageToClient(data.uuid, { status: 'active' });
  }
}
