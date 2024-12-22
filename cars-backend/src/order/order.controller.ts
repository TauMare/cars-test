import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
    constructor(
        private readonly ordersService: OrderService,
    ){}

    @Post('create')
    create(@Body() body): string {
        this.ordersService.createOrder(body.name, body.phone, body.uuid);
        return;
    }

    @Post('addData')
    addData(@Body() body): string {
        this.ordersService.addData(body.car, body.uuid);
        return;
    }
}