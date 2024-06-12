import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

// Modules
import { NewsModule } from './news/news.module'

// Utility
import { DatabaseNamingStrategy } from './db/database-naming.strategy'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL || 'postgresql://postgres:ITop1000MH@localhost:5432/internship_nestjs1',
      autoLoadEntities: true,
      synchronize: true,
      migrationsRun: false,
      logging: false,
      namingStrategy: new DatabaseNamingStrategy(),
      entities: [`${__dirname}/**/*.entity{.js,.ts}`],
      migrations: [`${__dirname}/**/migrations/*{.js,.ts}`],
    }),
    NewsModule,
  ],
})
export class AppModule {}
