import { gql } from "graphql-request"

// 创建用户
export const createUserMutaion = gql`
  mutation ($phone: String!) {
    Login(phone: $phone ) {
      message,
      code 
    }
  }
`
// 获取用户信息
export const getUserQuery = gql`
  query {
    getUserData {
      data {
        name
      }
    }
  }
`

// 增加文章
export const submitArticleMutation = gql`
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

export const getCategorys = gql`
 query {
	getCategorys {
    name
    description
    category_id
  } 
  
}
`