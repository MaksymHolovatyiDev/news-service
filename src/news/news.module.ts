import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

// Controllers
import { NewsController } from './news.controller'

// Services
import { NewsService } from './news.service'

// Entities
import { News } from './entities/news.entities'

@Module({
  imports: [TypeOrmModule.forFeature([News])],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
