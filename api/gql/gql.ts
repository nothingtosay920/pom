import { gql } from "graphql-request"

// 创建用户
export const createUserMutaion = gql`
  mutation ($phone: String!) {
    Login(phone: $phone )
  }
`

export const logOutGql = gql`
  mutation {
    LogOut 
  }
`

// 获取用户信息
export const getUserQuery = gql`
query {
	getUserData {
      name
      uuid
  }
}
`



// 增加文章
export const submitGatherMutation = gql`
mutation(
    $labels: [String!]!,
    $category: String!, 
    $gather_id: String!, 
    $gather_name: String!, 
    $article_data: [ArticleInput!]!, 
    $article_type: String!,
    $article_description: String!,
    $gather_img: String!,
  ) {
    addArticle(data: {
      labels: $labels,
      category: $category,
      gather_id: $gather_id,
      article_data: $article_data,
      gather_name: $gather_name,
      article_type: $article_type,
      article_description: $article_description,
      gather_img: $gather_img,
    })  
}
`
export const saveGatherMutation = gql`
mutation(
    $labels: [String!]!,
    $category: String!, 
    $gather_id: String!, 
    $gather_name: String!, 
    $article_data: [ArticleInput!]!, 
    $article_type: String!,
    $article_description: String!, 
    $gather_img: String!,
  ) {
    savedArticle(data: {
      labels: $labels,
        category: $category,
        gather_id: $gather_id,
        article_data: $article_data,
        gather_name: $gather_name,
        article_type: $article_type,
        article_description: $article_description,
        gather_img: $gather_img
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


export const getRecommendList = gql`
  query($label: String!, $page: Float!, $newest: String!) {
    recommendList(label: $label, page: $page, newest: $newest) {
      data {
        author {
          name
          user_img
          uuid
        }
        article_type
        title
        description
        hot
        zan {
          authorId
        }
        article_img
        outer_id
        edit_time
        labels {
          name
          label_id
          description
        }
        categorys {
          category_id
          description
        }
      }
      next
    }
  } 
`

export const getArticleById = gql`
query ($Id: String!, $token: String) {
  getArticleById(article_id: $Id, token: $token) {
    author {
      name
      user_img
      uuid
    }
    article_img
    article_type
    labels {
      name
      description
      label_id
    }
    categorys {
      category_id
    }
    description
    title
    article
    zan_status
    outer_id
    follow_status
    follow_user
    beFollowed {
      user_id
    }
    gather {
      gather_id
      gather_name
      articles {
        title
        outer_id
      }
    }
    zan {
      authorId
    }  
    collection_status
  }
}
`

export const insertFeeback = gql`
 mutation($article_id: String!, $vid: String!) {
  insertFeeback(article_id: $article_id, vid: $vid)
 }
`


export const addZan = gql`
mutation ($data: String!) {
  addZan(data: $data)
}
`

export const getALLUserGatherArticles = gql`
query  {
	getGatherArtilces {
    gather_img
      gather_name
      gather_id
      article_description
      article_type
      
  }
}
`

export const getColumnArticles = gql`
query {
	getBaseMusterInfo{
          gather_name
      gather_id
      gather_img
      article_description
      article_type
      articles {
        outer_id
      }
  }
}
`

export const getSingleArticles = gql`
query {
	getSingleInfo {
    title
    article_img
    description
    outer_id
    article_type
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
query($page: Float!) {
	getDraft(page: $page) {
    data {
      title
      edit_time
      outer_id
      article_type
    }
  }
  
}

`

export const SavedArticle = gql`
  mutation ($id: String!, $type: String!) {
    SavedArticle(id: $id, type: $type)
  }
`

export const getDynamicRes = gql`
query($content: String!, $type: String!) {
  dynamicApi (content: $content, type: $type){
    description
    outer_id
    zan {
      authorId
    }
    hot
    article_type
    title
    hot
    article_img
    collection_status
  	zan_status
    follow_status
    edit_time
    outer_id
 		categorys {
      category_id
    }
    labels {
      label_id
      description
    }
    author {
      name
      user_img
    }
  }
}
`

export const getWritingArticleById = gql`
query($article_id: String!) {
	getWritingArticle(article_id: $article_id) {
      type
    	gather_id
      gather_img
    	gather_name
      article_description
      article_data {
      	outer_id
        title
        article
        description
        article_img
        edit_time
    	}
    	category
    	labels
  }
}
`
export const getRecords = gql`
query($page: Float!) {
 getRecords(page: $page) {
    data {
    	timestamp
    title
    description
    author {
      name
      uuid
      user_img
    }
    hot
		zan {
      authorId
    }
    outer_id
    article_type
    }
    next
}
}
`

export const getAllArticlesPagenation = gql`
query($page:  Float!) {
  getAllArticlesPagenation(page: $page){
	next
  data {
    gather_id
    gather_img
    gather_name
    articles {
      article
      edit_time
      outer_id
      hot
      zan {
        article_id
      }
      beFollowed {
        user_id
      }
      title
      labels {
        name
        label_id
        description
      }
      categorys {
        category_id
      }
    }
    author {
      name
      user_img
      uuid
    }
    article_description
    article_type

  }
}
}
`

export const getAllArticles = gql`
  query {
	getAllArticles {
    articles {
      zan {
        authorId
      }
      hot
    }
  }
}
`

export const getCollectionArticles = gql`

query($page: Float!) {
getCollectionArticles(page: $page)	{
	data {
    description
    title
    outer_id
    article_img
    article_type
    edit_time
    author {
      name
      user_img
      uuid
    }
    zan {
        article_id
      }
      beFollowed {
        user_id
      }
    hot
 
    zan_status,
    follow_status
    collection_status
    labels {
      name 
      description
      label_id
    }
    categorys {
      category_id

    }
  }
  next
}
}
`

export const getMusterInfoById = gql`
	query($data: String!) {
    getColumnArticles(data: $data){
      gather_id
      gather_name
      gather_img
      article_type
      article_description
      author {
        name
        user_img
        uuid
      }
    articles {
      description
      title
      outer_id
      article_img
      edit_time
      zan {
          article_id
        }
        beFollowed {
          user_id
        }
      hot
      zan_status,
      follow_status
      collection_status
      labels {
        name 
        description
        label_id
      }
      categorys {
        category_id

      }
    }
  }
  }
`

export const createMuster = gql`
  mutation($data: GatherInput!) {
    createMuster(data: $data)
  }
`

export const Search = gql`
  query($query: String!, $page: Float!) {
    Search(query: $query, page: $page) {
      data {
        author {
          name
          user_img
          uuid
        }
        article_type
        title
        description
        hot
        zan {
          authorId
        }
        article_img
        outer_id
        edit_time
        labels {
          name
          label_id
          description
        }
        categorys {
          category_id
          description
        }
      }
      next
    }
  }
`

export const userRecommend = gql`
  query($page: Float!) {
	userRecommend(page: $page) {
    data
    next
  }
}
`

export const relateRecommend = gql`
query($label: String!) {
	relateRecommend(label: $label) {
    title
      description
      outer_id
  }
}
`


export const followArticle = gql`
  mutation ($article_id: String!) {
    followArticle(article_id: $article_id)
  }
`

export const followUser = gql`
  mutation ($followed_id: String!) {
    followedUser(followed_id: $followed_id)
  }
`

export const collectArticle = gql`
  mutation ($id: String!) {
    collectArticle(id: $id)
  }
`

export const UserMessage = gql`
query($page: Float!) {
	getUserMessage(page: $page){
    data {
      timestamp
      article_id
      article_type
      title
      info {
        reading_time
      }
    }
    next
  }
}
`

export const getArticlePanelStatus = gql`
query($article_id: String!) {
	getArticlePanelStatus(artcle_id: $article_id) {
    zan_status
    follow_status
    collect_status
  }
}
`