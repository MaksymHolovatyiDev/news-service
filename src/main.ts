import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'

import * as dotenv from 'dotenv'

// Modules
import { AppModule } from './app.module'

dotenv.config()

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.REDIS,
    options: {
      host: 'redis',
      port: 6379,
    },
  })

  await app.listen()
}
bootstrap()
