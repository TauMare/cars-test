import { forwardRef, Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api'; // works after installing types
import { Orders } from 'src/entities/order.entity';
import { OrderService } from 'src/order/order.service';

const TELEGRAM_TOKEN = process.env.TG_BOT_TOKEN;
const NOTIFY_CHAT_ID = process.env.NOTIFY_ID;

@Injectable()
export class TelegramService implements OnApplicationBootstrap{

  private readonly bot:any
    
  constructor(
    @Inject(forwardRef(()=> OrderService)) 
    private orderService: OrderService){
    this.bot = new TelegramBot(TELEGRAM_TOKEN, {polling: true});
  }
  sendMessage(name, phone, uuid){
    const opts = {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Enter car details',
              callback_data: uuid
            },
          ]
        ]
      }
    };
      this.bot.sendMessage(NOTIFY_CHAT_ID, `Its time to fill the car data, ${name}! Press down, if you are ready\n ${phone}`, opts);
    }
  sendDetails(order:Orders){
    this.bot.sendMessage(NOTIFY_CHAT_ID, `${order.name}, we\`re ended up with filling your data about ${order.car}. Will call you later with ${order.phone}`);
  }

  onApplicationBootstrap() {  
    this.bot.on('callback_query', async (callbackQuery) => {
      const action = callbackQuery.data;
  
      try {
        await this.orderService.switchOrderToCarScreen(action);
      } catch (error) {
        console.error('Произошла ошибка', error);
      }
  
      this.bot.answerCallbackQuery(callbackQuery.id);
    });
  }
}