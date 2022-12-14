import { MailerService } from '@nestjs-modules/mailer';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaMessage } from 'kafkajs';

@Controller()
export class AppController {
  constructor(private mailerService: MailerService) {}

  @MessagePattern('default')
  async orderCompleted(@Payload() message: KafkaMessage) {
    console.log(
      '🚀 ~ file: app.controller.ts ~ line 12 ~ AppController ~ order_completed ~ message',
      message,
    );
    const order: any = message.value;
    await this.mailerService.sendMail({
      to: 'admin@admin.com',
      subject: 'An order has been completed',
      html: `Order #${order.id} with a total of $${order.total} has been completed!`,
    });
    await this.mailerService.sendMail({
      to: order.ambassador_email,
      subject: 'An order has been completed',
      html: `You earned $${order.ambassador_revenue} from the link #${order.code}`,
    });
  }
}
