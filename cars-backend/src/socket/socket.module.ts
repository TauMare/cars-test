import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { OrderModule } from 'src/order/order.module';

@Module({
  imports: [OrderModule],
  providers: [SocketService],
  exports: [SocketService]
})
export class SocketModule {}
