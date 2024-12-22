import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from 'src/entities/order.entity';
import { SocketService } from 'src/socket/socket.service';
import { TelegramService } from 'src/telegram/telegram.service';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Orders)
        private ordersRepository: Repository<Orders>,
        private readonly socketService: SocketService,
        @Inject(forwardRef(()=> TelegramService)) private telegramService: TelegramService
        
        
    ) {}
    async createOrder(name, phone, uuid): Promise<void> {
        const existingOrder = await this.ordersRepository.findBy({uuid: uuid})
        if (existingOrder.length > 0) {
            return;
        }
        const order = new Orders;
        order.name = name;
        order.phone = phone;
        order.uuid = uuid;
        
        this.telegramService.sendMessage(order.name, order.phone, order.uuid)
        return;
    }

    async addData(details, uuid){
        const order = await this.ordersRepository.findOneBy({uuid: uuid});
        order.car = details;
        const result = await this.ordersRepository.save(order);
        this.telegramService.sendDetails(result);
    }

    async switchOrderToCarScreen(uuid) {
        const order = await this.ordersRepository.findOneBy({uuid: uuid});
        order.onCarScreen = true;
        await this.ordersRepository.save(order);
        this.socketService.sendMessageToClient(uuid, { status: 'active' })
    }

    async getStatus(uuid) {
        const order = await this.ordersRepository.findOneBy({uuid: uuid});
        if (order) {
            return order.onCarScreen;
        }
        return false;
    }
}
