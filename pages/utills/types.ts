export type createUserParam = {
  phone: string
}

export type submitMusterArticleParam = {
  name: string,
  article_data: musterArticle
}

export type musterArticle = {
  title: string,
  article: string
}