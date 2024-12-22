import { forwardRef, Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { OrderModule } from 'src/order/order.module';

@Module({
    imports: [forwardRef(() => OrderModule)],
    providers: [TelegramService],
    exports: [TelegramService]
})

export class TelegramModule {}
