import { forwardRef, Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from 'src/entities/order.entity';
import { TelegramModule } from 'src/telegram/telegram.module';
import { SocketService } from 'src/socket/socket.service';
@Module({
  imports: [TypeOrmModule.forFeature([Orders]), forwardRef(() => TelegramModule)],
  controllers: [OrderController],
  providers: [OrderService, SocketService],
  exports: [OrderService]
})
export class OrderModule {}
