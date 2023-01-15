import http from '@/utils/http'
import dayjs from 'dayjs'
import { v4 as uuidv4 } from 'uuid'

export const fetchArticleList = () => {
  return http.get<Article.ArticleList>({
    url: '/article',
  })
}

export const createArticle = (
  data: Omit<Article.ArticleItem, 'id' | 'createTime' | 'updateTime'>,
) => {
  return http.post({
    url: '/article',
    data: {
      id: uuidv4(),
      createTime: dayjs().format('YYYY-MM-DD'),
      updateTime: dayjs().format('YYYY-MM-DD'),
      ...data,
    },
  })
}

export const updateArticle = (
  id: string,
  data: Omit<Article.ArticleItem, 'id' | 'createTime' | 'updateTime'>,
) => {
  return http.put({
    url: '/article/' + id,
    data: { ...data, updateTime: dayjs().format('YYYY-MM-DD') },
  })
}

export const patchArticle = (
  id: string,
  { prop, value }: { prop: string; value: boolean | string | number },
) => {
  return http.patch({
    url: '/article/' + id,
    data: {
      [prop]: value,
    },
  })
}

export const deleteArticle = (id: string) => {
  return http.delete({
    url: '/article/' + id,
  })
}

export const getList = () => {
  return http.get({
    url: '/client/flight/place?word=hkt',
  })
}
