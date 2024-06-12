export interface IGetAllNews {
  searchTerm: string
  publishedBefore: Date
  publishedAfter: Date
  page: number
  limit: number
}

export interface ICreateBody {
  author: string
  content: string
  title: string
  published: boolean
}

export interface IUpdateBody {
  id: string
  data: ICreateBody
}

export interface IBodyWithId {
  id: string
}
