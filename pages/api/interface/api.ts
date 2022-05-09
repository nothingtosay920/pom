import { useMutation, useQuery } from "react-query"
import { Category, createUserParam, submitMusterArticleParam } from "../../utills/types"
import { createUserMutaion, getCategorys, getUserQuery, submitArticleMutation } from "../gql/gql"
import graphqlClient from "../GqlClient"

export function LoginApi(data: createUserParam) {
  return useMutation(
    async () => {
      return await graphqlClient.request(createUserMutaion, { ...data }).then((data) => data)
    }
  )
}

export function useGetUserByCookie() {
  return useQuery('getUser', async () => {
    return await graphqlClient.request(getUserQuery)
  },
  )
}

export function SubmitMusterArticle(data: submitMusterArticleParam) {
  return useMutation(
    async () => {
      return await graphqlClient.request(submitArticleMutation, {
        name: data.name,
        title: data.article_data.title,
        article: data.article_data.article
      }).then((data) => data)
    }
  )
}

export function GetCategorys() {
  return useQuery<[Category]>('getCategorys', async () => {
    return await graphqlClient.request(getCategorys).then(data => data.getCategorys)
  })
}