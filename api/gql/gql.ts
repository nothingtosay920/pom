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

export const logOut = gql`
  mutation {
    LogOut {
      code
    }
  }
`

// 获取用户信息
export const getUserQuery = gql`
query {
	getUserData {
      name
      open_id
  }
}
`



// 增加文章
export const submitMusterMutation = gql`
  mutation (
    $title: String!, 
    $article: String!, 
    $category: String!, 
    $description: String!, 
    $articleImg: String!, 
    $labels: [LabelType!]!,
    $muster_id: String!,
    $muster_article_id: String!
    ){
      addMuster (data: {
        article_data: {
          title: $title,
          article: $article,
          description: $description,
          articleImg: $articleImg
        },
        category: $category,
        labels: $labels,
        muster_id: $muster_id,
        muster_article_id: $muster_article_id
      }) {
        article_id
      }
  } 
`
export const saveMusterMutation = gql`
    mutation ($title: String!, $article: String!, $category: String!, $description: String!, $articleImg: String!, $labels: [LabelType!]!){
      savedMuster (mArticle: {
      article_data: {
        title: $title,
        article: $article,
        description: $description,
        articleImg: $articleImg
      },
      category: $category,
      labels: $labels
    }) 
  } 
`
export const submitGatherMutation = gql`
mutation($label: [LabelType!]!, $category: String!, $gather_id: String!, $gather_article_id: String!, $article_data: [GatherArticle!]!) {
  addGather(data: {
    label: $label,
    category: $category,
    gather_id: $gather_id,
    gather_article_id: $gather_article_id
    article_data: $article_data
  }) {
    article_id
  }
}
`
export const saveGatherMutation = gql`
mutation($label: [LabelType!]!, $category: String!, $gather_id: String!, $gather_article_id: String!, $article_data: [GatherArticle!]!) {
  saveGather(data: {
    label: $label,
    category: $category,
    gather_id: $gather_id,
    gather_article_id: $gather_article_id
    article_data: $article_data
  })
}
`



// 获取分类
export const getCategorys = gql`
 query {
	getCategorys {
    name
    description
    category_id
    labels {
      name
      description
      label_id
    }
  } 
}
`

// 获取标签
export const getLabels = gql`
  query {
    getLabels {
      name
      description
      label_id
    }
}
`

// 获取最新文章
export const getLatestArticles = gql`
  query($labels: [LabelType!]!) {
    recommendList(label: {
      labels: $labels
    }) {
      author
      muster
      gather
      title
      description
      hot
      zan
      article_img
      outer_id
      edit_time
      labels 
      categorys
  }
  }
`

export const getArticleById = gql`
query ($Id: String!) {
  getArticleById(article_id: $Id) {
    author
    article_img
    type
    labels
    categorys
    description
    title
    article
    zan_status
    id
    author_name
    author_img
    follow_status
    befollowed
  }
}
`
export const addZan = gql`
mutation ($data: String!, $type: String!) {
  addZan(data: $data, type: $type)
}
`

export const getALLUserGatherArticles = gql`
query {
	getGatherArtilces {
    author
    author_name
    article_data
    muster_id
    name
    type
    muster_img
    gather_id
    description
  }
}
`

export const getALLUserMusterArticles = gql`
query($page: Float!) {
	getAllMuster(page: $page) {
    author
    author_name
    article_data
    muster_id
    name
    type
    muster_img
    description
    article_id

  }
}
`

export const getDynamic = gql`
query($page: Float!) {
  getDynamic(page: $page) {
    dynamic {
      time_tamp
      content
      type
      dynamic_id
    }
    next
    count
  } 
}
` 

export const getUserInfo = gql`
query {
  getUserInfo {
    name
    user_img
  }
}
`

export const getDraft = gql`
query {
  getDraft {
    article_id
    type
    title
    time_stmap
  }
}
`

export const followedArticle = gql`
  mutation ($id: String!, $type: String!) {
    followedArticle(id: $id, type: $type)
  }
`

export const getDynamicRes = gql`
query($content: String!, $type: String!) {
  dynamicApi (content: $content, type: $type){
    description
    id
    zan
    hot
    type
    title
    hot
    author
    author_img
    article_img
    author_name
    name
    collection_status
  	zan_status
    follow_status
    edit_time
    outer_id
    categorys
    labels
    
  }
}
`

export const WritingArticle = gql`
query($uid: String!) {
  getWritingArticle (uid: $uid){
    muster_data {
      article_data {
        outer_id
      }
    }
    gather_data {
      article_data {
        outer_id
      }
    }
  }
}
`

export const getWritingArticleById = gql`
query($article_id: String!) {
	getWritingArticleById(article_id: $article_id) {
    labels
    categorys
    description
    article_data {
      article
      title
      article_img
    }
    article_img
    article
    title
    type
    muster
    id

  }
}
`

export const getBaseMusterInfo = gql`
query {
 getBaseMusterInfo{
	muster_data {
    name
    muster_id
  }
	}
}
`
export const getRecords = gql`
query($page: Float!) {
 getRecords(page: $page) {
  article_data {
      timestamp
  title
  description
  author
  hot
  zan
  id
  type
  }
}
}
`

export const getAllArticles = gql`
query($page:  Float!) {
getAllArticles(page: $page){
	next
  AllArticles {
    zan
    hot
    title
    outer_id
    article_img
    article_type
    description
    edit_time
    labels {
      Labels {
        name
        description
        label_id
      }
    }
  }
}
}
`

export const getCollectionArticles = gql`

query($page: Float!) {
getCollectionArticles(page: $page)	{
	list {
  description
  title
  id
  article_img
  type
  edit_time
  author
  zan
  hot
  author_img
  author_name
  zan_status,
  follow_status
  collection_status
  labels
  categorys
  befollowed
  }
  count
  next
}
}
`

export const getMusterInfoById = gql`
query($data: String!) {
  getMusterInfoById(mid: $data) {
    author {
      name
      user_img
      uuid_user
    }
    muster_img
    name
    article_data {
      zan
      article
      hot
      title
      description
      edit_time
      
    }
    description
  }
}
`

export const createMuster = gql`
  mutation($data: CMuster!) {
    createMuster(data: $data)
  }
`