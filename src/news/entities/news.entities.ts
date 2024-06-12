import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'news' })
export class News {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  content: string

  @Column()
  author: string

  @Column()
  published: boolean

  @CreateDateColumn()
  createdAt: Date
}
