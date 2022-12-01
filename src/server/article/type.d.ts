declare namespace Article {
  interface ArticleItem {
    id: string
    createTime: string
    updateTime: string
    title: string
    content: string
  }
  type ArticleList = Array<Article>
}
