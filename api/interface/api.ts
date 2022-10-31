import { gql, GraphQLClient } from "graphql-request"
import { useInfiniteQuery, useMutation, useQuery } from "react-query"
import { addZan, collectArticle, createUserMutaion, followArticle, followUser, getAllArticles, getAllArticlesPagenation, getALLUserGatherArticles,  getArticleById,  getArticlePanelStatus,  getCategorys, getCollectionArticles, getColumnArticles, getDraft, getDynamic, getDynamicRes, getLabels, getMusterInfoById, getRecommendList, getRecords, getSingleArticles, getUserInfo, getUserQuery, getWritingArticleById, insertFeeback, relateRecommend, saveGatherMutation, Search, UserMessage, userRecommend } from "../gql/gql"
import graphqlClient from "../GqlClient"
import { AllArticlesInfo, AllArticlesRes, AllArticlesType, ArticlePanelStatus, ArticleType, BaseMusterInfo, Category, CollectionArticleRes, ColumnArticlesRes, createUserParam, draft, DymicApiRes, DymicRes, GatherArticleRes, getArticleByIdRes, getCategorysRes, GetDraft, getLabelsRes, getUserType, Labels, LatestArticles, MusterInfoByIdRes, RecordsRes, RelateRecommendType, SerachRes, SingleArticleRes, userInfo, UserMessageType, UserRecommendType, WritingArticleType } from "./types"


export function useGetUserByCookie() {
  return useQuery<getUserType>('user', async () => {
    return await graphqlClient.request(getUserQuery).then((data) => data.getUserData)
  }, {
    refetchOnWindowFocus: false,
  })
}



export function GetCategorys() {
  return useQuery('getCategorys', async () => {
    return await graphqlClient.request<getCategorysRes>(getCategorys).then(data => data.getCategorys)
  }, {
    refetchOnWindowFocus: false
  })
  // return graphqlClient.request<getCategorysRes>(getCategorys).then((data) => {
  //   return data
  // })
}

export function GetLabels() {
  return useQuery('getLabels',async () => {
    return await graphqlClient.request<getLabelsRes>(getLabels).then(data => data.getLabels)
  }, {
    refetchOnWindowFocus: false
  })
  // return graphqlClient.request<getLabelsRes>(getLabels).then((data) => {
  //   return data
  // })
}

export const GetLabelsSSRAPi = async () => {
  return await graphqlClient.request<getLabelsRes>(getLabels).then(data => data.getLabels)
}


export function GetRecommendListApi(label: string, newest: string | undefined) {
  if (newest === undefined) {
    newest = ''
  }
  return useInfiniteQuery(['LatestArticles', label],
    async ({pageParam = 0}) => {
      return await graphqlClient.request<LatestArticles>(getRecommendList, {label, newest, page: pageParam}).then((data) => {
        return data.recommendList
      })
    }, 
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage) => lastPage.next,
    }
  )
}

export async function GetArticle(Id: string, token: string) {
  return await graphqlClient.request<{getArticleById: ArticleType}>(getArticleById, {Id, token}).then((data) => data.getArticleById)
}

export function GetGatherArtilces() {
  return useQuery('AllGatherArticles', async () => {
    return await graphqlClient.request<GatherArticleRes>(getALLUserGatherArticles).then((res) => res.getGatherArtilces)
  }, {
    refetchOnWindowFocus: false,
  })
}

export function GetMusterArticles() {
  return useQuery('AllMusterArticles', async () => {
    return await graphqlClient.request<ColumnArticlesRes>(getColumnArticles).then((res) => {
      console.log(res, '------');
      
      return res.getBaseMusterInfo
    })
  }, {
    refetchOnWindowFocus: false,
  })
}

export function GetSingleArticles() {
  return useQuery('SingleArticles', async () => {
    return await graphqlClient.request<SingleArticleRes>(getSingleArticles).then((res) => {
      return res.getSingleInfo
    })
  }, {
    refetchOnWindowFocus: false,
  })
}


export function GetDynamic(uuid: string | undefined) {
  return useInfiniteQuery(['GetDynamic', uuid], async ({pageParam = 0}) => {
      return await graphqlClient.request<DymicApiRes>(getDynamic, {page:pageParam}).then((res) => {
        return res
      })
  },
  {
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage: any) => lastPage.next,
    enabled: !!uuid
  } 
  )
} 

export function GetUserInfo(uuid: string | undefined) {
  return useQuery(['GetUserInfo', uuid], async () => {
    return await graphqlClient.request<userInfo>(getUserInfo).then((res) => {
      return res.getUserInfo
    })
  }, {
    refetchOnWindowFocus: false,
    enabled: !!uuid,
  })
}

export function GetDraft() {
  return useInfiniteQuery('GetDraft', async ({pageParam = 0}) => {
    return await graphqlClient.request<GetDraft>(getDraft, {page: pageParam}).then((res) => res.getDraft)
  },
  {
    refetchOnWindowFocus: false,
  } )
}

export function DynamicApi(content: string, type: string, uuid: string | undefined) {
  return useQuery(['DynamicApi', content, type, uuid], async () => {
    return await graphqlClient.request<DymicRes>(getDynamicRes, {content, type}).then((res) => {
      return  res.dynamicApi
    })
  }, {
    refetchOnWindowFocus: false,
    enabled: !!uuid,
  })
}

export function GetWritingArticleById(article_id: string) {
  return useQuery(['WritingArticle', article_id], async () => {
    return await graphqlClient.request<WritingArticleType>(getWritingArticleById, {article_id}).then((res) => res.getWritingArticle)
  }, {
    enabled: article_id !== undefined,
    refetchOnWindowFocus: false
  })
}

export function GetRecords(uuid: string | undefined) {
  return useInfiniteQuery(['GetRecords', uuid], async ({pageParam = 0}) => {
    return await graphqlClient.request<RecordsRes>(getRecords, {page: pageParam}).then((res) => res.getRecords)
  },
  {
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage) => lastPage.next,
    enabled: !!uuid
  } )
}

export function GetAllArticlesPagenation(uuid: string | undefined) {
  return useInfiniteQuery(['GetAllArticlesPagenation', uuid], ({pageParam = 0}) => {
    return graphqlClient.request<AllArticlesRes>(getAllArticlesPagenation, {page: pageParam}).then((res) => {
      return res.getAllArticlesPagenation
    })
  },
  {
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage) => lastPage.next,
    enabled: !!uuid
  } )
}

export function GetCollectionArticlesArticles(uuid: string | undefined) {
  return useInfiniteQuery(['GetCollectArticles', uuid], ({pageParam = 0}) => {
    return graphqlClient.request<CollectionArticleRes>(getCollectionArticles, {page: pageParam}).then((res) => {
      return res.getCollectionArticles
    })
  },
  {
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage) => lastPage.next,
    enabled: !!uuid
  } )
}

export function GetMusterInfoById(data: string) {

  return useQuery(['GetMusterInfoById', data], async () => {
    return await graphqlClient.request<MusterInfoByIdRes>(getMusterInfoById, {data}).then((res)=> res.getColumnArticles) 
  }, {
    refetchOnWindowFocus: false,
    enabled: data !== '[...id]',
  })
}

export function SerachApi(query: string , page: number) {
  return useInfiniteQuery(['search', query, page], async ({pageParam = 0}) => {
    return await graphqlClient.request<SerachRes>(Search, {query, page: pageParam}).then((res) => res.Search)
  },
  {
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage) => lastPage.next,
  } 
  )
}

export async function InsertFeebackApi(article_id: string, vid: string | undefined) {
  if (vid) {
    return await graphqlClient.request(insertFeeback, {vid, article_id}).then((res) => res)
  }
}

export function GetUserRecommend(page: number) {
  return useQuery(['userRecommend', page], async () => {
    return await graphqlClient.request<UserRecommendType>(userRecommend, {page}).then((res) => res.userRecommend.data)
  },
  {
    refetchOnWindowFocus: false,
  } 
  )
}

export function GetRelateRecommend(label: string) {
  return useQuery(['relateRecommend', label], async () => {
    return await graphqlClient.request<RelateRecommendType>(relateRecommend, {label}).then((res) => res.relateRecommend)
  }, {
    refetchOnWindowFocus: false,
  })
}


export function FollowArticleApi(article_id: string) {
  return useMutation<Number>(async () => {
    return graphqlClient.request(followArticle, {article_id}).then((res) => res)
  })
}

export function FollowUserApi(article_id: string) {
  return useMutation<Number>(async () => {
    return graphqlClient.request(followUser, {article_id}).then((res) => res)
  })
}

export function GetUserMessage(uuid: string | undefined) {
  return useInfiniteQuery(['getUserMessage', uuid], async ({pageParam = 0}) => {
    return graphqlClient.request<UserMessageType>(UserMessage, {page: pageParam}).then((res) => res.getUserMessage)
  },{
    refetchOnWindowFocus: false,
    enabled: !!uuid
  })
}

export function GetAllArticles(uuid: string | undefined) {
  return useQuery(['getAllArticles', uuid], async () => {
    return graphqlClient.request<AllArticlesInfo>(getAllArticles).then((res) => res.getAllArticles)
  }, 
  {
    enabled: !!uuid
  })
}

export function GetArticlePanelStatus(article_id: string, uuid: string | undefined) {
  return useQuery(['getArticlePanelStatus', article_id, uuid], async () => {
    return graphqlClient.request<ArticlePanelStatus>(getArticlePanelStatus, {article_id}).then((res) => res.getArticlePanelStatus, () => {
      return {
        zan_status: false,
        follow_status: false,
        collect_status: false
      }
    })
  },{
    refetchOnWindowFocus: false,
    enabled: !!uuid,
  })
}