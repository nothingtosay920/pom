import { gql, GraphQLClient } from "graphql-request";
import { useMutation, UseMutationResult, useQuery } from "react-query";
import { createUserParam, submitMusterArticleParam } from "./types";

const endpoint = "http://localhost:8080/graphql"
const graphqlClient = new GraphQLClient(
  endpoint,
  { credentials: 'include' }
)

const createUserMutaion = gql`
  mutation ($phone: String!) {
    Login(phone: $phone ) {
      message,
      code 
    }
  }
`
const getUserQuery = gql`
  query {
    getUserData {
      data {
        name
      }
    }
  }
`

const submitArticleMutation = gql`
  mutation ($name: String!, $title: String!, $article: String!){
    createMusterArticle (mArticle: {
      article_data: {
        tilte: $title,
        article: $article
      },
      name: $name
    }) {
      name
    }
  }
`

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