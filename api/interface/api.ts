import { useInfiniteQuery, useMutation, useQuery } from "react-query"
import { gather, muster } from "../../pages/edit/[[...articleId]]"
import { addZan, createUserMutaion, getAllArticles, getALLUserGatherArticles, getALLUserMusterArticles, getArticleById, getBaseMusterInfo, getCategorys, getCollectionArticles, getDraft, getDynamic, getDynamicRes, getLabels, getLatestArticles, getMusterInfoById, getRecords, getUserInfo, getUserQuery, getWritingArticleById, logOut, saveGatherMutation, saveMusterMutation, submitGatherMutation, submitMusterMutation, WritingArticle } from "../gql/gql"
import graphqlClient from "../GqlClient"
import { AddArticleRes, AllArticlesRes, AllArticlesType, Articles, ArticleType, BaseMusterInfo, Category, CollectionArticleRes, createUserParam, draft, DymicApiRes, DymicRes, GatherArticleRes, getArticleByIdRes, getCategorysRes, GetDraft, getLabelsRes, getUserType, Labels, LatestArticles, MusterInfoByIdRes, MustherArticleRes, RecordsRes, userInfo, WritingArticleType } from "./types"

export function LoginApi(data: createUserParam) {
  return useMutation(
    async () => {
      return await graphqlClient.request(createUserMutaion, { ...data }).then((data) => data)
    },
  )
}

export function LogOutMutation() {
  return useMutation(async () => {
    return await graphqlClient.request(logOut).then((res) => {
      return res
    })
  })
}

export function useGetUserByCookie() {
  return useQuery<getUserType>('user', async () => {
    return await graphqlClient.request(getUserQuery).then((data) => data.getUserData)
  }, {
    refetchOnWindowFocus: false,
  })
}



export function SavedMusterArticle(data: muster) {
  
  return useMutation<void>(
    async () => {
      return await graphqlClient.request(saveMusterMutation, {
        description: data.description,
        article: data.article,
        category: data.categorys,
        labels: data.labels.map((item) => ({label: item})),
        title: data.title,
        articleImg: data.article_img
      }).then()
    }
  )
}

export function SavedGatherArticle(data: gather) {
  return useMutation<void>(
    async () => {
      return await graphqlClient.request(saveGatherMutation, {
        labels: data.labels.map((item) => ({label: item})),
        category: data.categorys,
        aritcle_data: data.article_data,
        gather_article_id: data.gather_article_id,
        gather_id: data.gather_id
      }).then()
    }
  )
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

export function GetLatestArticles(path: string, aspath: string) {
  let labels: {label: string}[] = [{label: ''}]

  if (path.indexOf('/[') !== 0) {
    labels = path.split('/').slice(1).map((item) => {
      return {
        label: item
      }
    })
  }
  return useQuery<LatestArticles>('LatestArticles'+`${path}`,
    async () => {
      return await graphqlClient.request(getLatestArticles, {labels: labels}).then((data) => {
        console.log(data);
        
        return data
      })
    }, {
      enabled: path !== '/[[..labels]]',
      refetchOnWindowFocus: false
    }
  )
}

export function GetArticle(Id: string) {
  return useQuery(['GetArticle', Id], async () => {
    return await graphqlClient.request<{getArticleById: Articles}>(getArticleById, {Id}).then((data) => data.getArticleById)
  }, {
    enabled: Id !== undefined,
  })
}

export function GetGatherArtilces() {
  return useQuery('AllGatherArticles', async () => {
    return await graphqlClient.request<GatherArticleRes>(getALLUserGatherArticles).then((res) => res.getGatherArtilces)
  }, {
    refetchOnWindowFocus: false
  })
}

export function GetMusterArticles() {
  return useQuery('AllMusterArticles', async () => {
    return await graphqlClient.request<MustherArticleRes>(getALLUserMusterArticles, {page: 0}).then((res) => {
      
      return res.getAllMuster
    })
  }, {
    refetchOnWindowFocus: false
  })
  
}

export function GetDynamic() {
  // if (prepage === page) {
  //   return
  // }


  return useInfiniteQuery('GetDynamic', async ({pageParam = 0}) => {
      return await graphqlClient.request<DymicApiRes>(getDynamic, {page:pageParam}).then((res) => {
        return res
      })
  },
  {
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage: any) => lastPage.next,
   
  } 
  )
} 

export function GetUserInfo() {
  return useQuery('GetUserInfo', async () => {
    return await graphqlClient.request<userInfo>(getUserInfo).then((res) => {
      return res.getUserInfo
    })
  })
}

export function GetDraft() {
  return useQuery('GetDraft', async () => {
    return await graphqlClient.request<GetDraft>(getDraft).then((res) => res)
  })
}

export function DynamicApi(content: string, type: string) {
  return useQuery(['DynamicApi', content, type], async () => {
    return await graphqlClient.request<DymicRes>(getDynamicRes, {content, type}).then((res) => {
      return  res.dynamicApi
    })
  }, {
    refetchOnWindowFocus: false,
  })
}

export async function WritingArticleApi(uid: string) {
  return await graphqlClient.request<WritingArticleType>(WritingArticle, {uid}).then((res) => res)
}

export function GetWritingArticleById(article_id: string) {
  return useQuery(article_id, async () => {
    return await graphqlClient.request(getWritingArticleById, {article_id}).then((res) => res.getWritingArticleById, (err) => {
      return null
    })
  }, {
    enabled: article_id !== undefined,
    refetchOnWindowFocus: false
  })
}

export function GetBaseMusterInfo() {
  return useQuery('BaseMusterInfo', async () => {
    return await graphqlClient.request<BaseMusterInfo>(getBaseMusterInfo).then((res) => res.getBaseMusterInfo)
  }, {
    refetchOnWindowFocus: false
  })
}

export function GetRecords() {
  return useInfiniteQuery('GetRecords', async ({pageParam = 0}) => {
    return await graphqlClient.request<RecordsRes>(getRecords, {page: pageParam}).then((res) => res.getRecords)
  },
  {
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage) => lastPage.next,
   
  } )
}

export function GetAllArticles() {
  return useInfiniteQuery('GetAllArticles', async ({pageParam = 0}) => {
    return await graphqlClient.request<AllArticlesRes>(getAllArticles, {page: pageParam}).then((res) => {
      return res.getAllArticles
    })
  },
  {
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage) => lastPage.next,
   
  } )
}

export function GetCollectionArticlesArticles() {
  return useInfiniteQuery('GetAllArticles', async ({pageParam = 0}) => {
    return await graphqlClient.request<CollectionArticleRes>(getCollectionArticles, {page: pageParam}).then((res) => {
      return res.getCollectionArticles
    })
  },
  {
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage) => lastPage.next,
   
  } )
}

export function GetMusterInfoById(data: string) {

  return useQuery(['GetMusterInfoById', data], async () => {
    return await graphqlClient.request<MusterInfoByIdRes>(getMusterInfoById, {data}).then((res)=> res.getMusterInfoById) 
  }, {
    refetchOnWindowFocus: false,
    enabled: data !== '[...id]',
  })
}