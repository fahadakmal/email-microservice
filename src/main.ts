import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['pkc-xrnwx.asia-south2.gcp.confluent.cloud:9092'],
          ssl: true,
          sasl: {
            mechanism: 'plain',
            username: 'R6THPSEVGBYZ4ONV',
            password:
              '1HKd/fvK/cJtS6ou0SkInbAtWN7RMzaWzqjNR1ePNvX/2FEdozoF6S6/XaF4UgKD',
          },
        },
      },
    },
  );
  await app.listen();
}
bootstrap();
