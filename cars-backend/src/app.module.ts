import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from './entities/order.entity';
import { TelegramModule } from './telegram/telegram.module';
import { SocketService } from './socket/socket.service';
import { SocketModule } from './socket/socket.module';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'pg_db',
    port: 5432,
    username: 'root',
    password: 'root',
    database: 'prod_db',
    entities: [Orders],
    synchronize: true,
  }), OrderModule, TelegramModule, SocketModule],
  controllers: [AppController],
  providers: [AppService, SocketService],
})
export class AppModule {}
