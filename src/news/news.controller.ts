import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'

// Services
import { NewsService } from './news.service'

// Interfaces
import { IBodyWithId, ICreateBody, IGetAllNews, IUpdateBody } from './interfaces/news.interfaces'

@Controller()
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @MessagePattern('get-all-news')
  getAllNews(@Payload() params: IGetAllNews) {
    return this.newsService.getAllNews(params)
  }

  @MessagePattern('get-item')
  getNewsById(@Payload() body: IBodyWithId) {
    return this.newsService.getNewsById(body)
  }

  @MessagePattern('create-item')
  createNews(@Payload() body: ICreateBody) {
    return this.newsService.createNews(body)
  }

  @MessagePattern('update-item')
  updateNews(@Payload() body: IUpdateBody) {
    return this.newsService.updateNews(body)
  }

  @MessagePattern('delete-item')
  deleteNews(@Payload() body: IBodyWithId) {
    return this.newsService.deleteNews(body)
  }
}
