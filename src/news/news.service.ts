import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { paginate } from 'nestjs-typeorm-paginate'

// Entities
import { News } from './entities/news.entities'

//Interfaces
import { IBodyWithId, ICreateBody, IGetAllNews, IUpdateBody } from './interfaces/news.interfaces'

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private newsRepository: Repository<News>,
  ) {}

  getAllNews({ searchTerm, publishedAfter, publishedBefore, page = 1, limit = 5 }: IGetAllNews) {
    const queryBuilder = this.newsRepository.createQueryBuilder('news')

    if (searchTerm) {
      queryBuilder.where('news.content LIKE :search', { search: `%${searchTerm}%` })
    }
    if (publishedAfter) {
      queryBuilder.where('news.createdAt >= :publishedAfter', { publishedAfter })
    }
    if (publishedBefore) {
      queryBuilder.where('news.createdAt <= :publishedBefore', { publishedBefore })
    }

    return paginate(queryBuilder, { page, limit })
  }

  async getNewsById({ id }: IBodyWithId) {
    try {
      return await this.newsRepository.findOne({ where: { id: parseInt(id, 10), published: true } })
    } catch (err) {
      return err
    }
  }

  async createNews(body: ICreateBody) {
    try {
      const news = this.newsRepository.create(body)
      await this.newsRepository.save(news)

      return news
    } catch (err) {
      return err
    }
  }

  async updateNews(body: IUpdateBody) {
    try {
      const newsToUpdate = await this.newsRepository.findOne({ where: { id: parseInt(body.id, 10) } })
      if (!newsToUpdate) return newsToUpdate

      const updatedNews = Object.assign(newsToUpdate, body.data)
      return await this.newsRepository.save(updatedNews)
    } catch (err) {
      return err
    }
  }

  async deleteNews({ id }: IBodyWithId) {
    try {
      return await this.newsRepository.delete(id)
    } catch (err) {
      return err
    }
  }
}
