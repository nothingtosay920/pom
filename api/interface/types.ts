export type createUserParam = {
  phone: string
}

export type getUserType = {
  name: string,
  uuid: string
}

export type LabelMapType = {
  label: string
}[]

export type musterArticle = {
  description: string | undefined,
  article: string,
  articleImg: string,
  title: string
}

export type Labels = {
  name: string,
  description: string,
  label_id: string
}

export type Category = {
  name: string,
  description: string,
  category_id: string
  labels: Labels[]
}

export type getCategorysRes = {
  getCategorys: [Category]
}

export type getLabelsRes = {
  getLabels: [Labels]
}

export type ArticleType = {
  description: string
  outer_id: string
  zan: {
    authorId: string
  }[],
  hot: string,
  article_type: ArticleClassType
  title: string
  article_img: string
  collection_status: boolean
  zan_status: boolean
  follow_status: boolean
  follow_user: boolean
  edit_time: string
  categorys: {
    category_id: string
  }[]
  labels: {
    label_id: string
    description: string,
    name: string
  }[]
  author: {
    name: string
    uuid: string
    user_img: string
  }
  beFollowed: {
    user_id: string
  }[] | null
}

export type GatherType = {
  article_description: string
  gather_id: string
  gather_img: string
  gather_name: string
  author: {
    name: string
    user_img: string
    uuid: string
  }
  articles: ArticleType[],
  article_type: ArticleClassType
}

export type GatherResType = {
  articles: {
    outer_id: string;
    title: string;
  }[];
  gather_id: string;
  gather_name: string;
}

export type AuthorType = {
  name: string
  uuid: string
  user_img: string
}

export type LatestArticles = {
  recommendList: {
    data: ArticleType[],
    next: number
  }
}

export type getArticleByIdRes = {
  getArticleById: ArticleType
}

export type ArticleClassType =  'SINGLE' | 'GATHER' | 'COLUMN'


export type Dynamic = {
    time_tamp: string,
    type: string,
    content: string,
    dynamic_id: string
}

export type DymicApiRes = {
  getDynamic: {
    dynamic: Dynamic[],
    next: number
    count: number
  },
}

export type userInfo = {
  getUserInfo: {
    name: string,
    user_img: string
  }
}

export type draft = {
  outer_id: string,
  article_type: string,
  title: string,
  edit_time: string
}

export type GetDraft = {
  getDraft: {
    data: draft[]
  }
}

export type DymicRes = {
  dynamicApi: ArticleType
}

export type WritingArticleType = {
  getWritingArticle: {
    type: ArticleClassType
    gather_id: string
    gather_img: string
    gather_name: string
    article_description: string
    article_data: {
      outer_id: string
      title: string
      article: string
      description: string
      article_img: string
      edit_time: string
    }[]
    category: string
    labels: string[]
  }
}

export type BaseMusterInfo = {
  getBaseMusterInfo: {
    data: {
      gather_id: string | null,
      gather_name: string
    }[]
  }
}

export type RecordsRes = {
  getRecords: {
    data: {
      timestamp: string,
      title: string,
      description: string,
      author: {
        name: string
        uuid: string
        user_img: string
      },
      hot: string,
      zan: string,
      zan_status: string
      outer_id: string,
      type: string
    }[],
    next: number
  }
}

export type AllArticlesType = {
  title: string
  author: string
  zan: string
  hot: string
  befollowed: string
  outer_id: string
  article_img: string
  article_type: string,
  description: string,
  edit_item: string,
  labels: LabelInArticle
}

export type LabelInArticle = {
  Labels: {
    name: string
    description: string
    label_id: string
  }
}

export type AllArticlesRes = {
  getAllArticlesPagenation: {
    data: GatherType[],
    next: number
  }
}


export type CollectionArticleRes = {
  getCollectionArticles: {
    data: ArticleType[],
    next: number,
    count: number
  }
}

export type MusterInfoByIdRes = {
  getColumnArticles: {
    gather_id: string
    gather_name: string
    gather_img: string
    article_description: string
    article_type: ArticleClassType
    author: {
      name: string
      user_img: string
      uuid: string
    }
    articles: {
      description: string
      title: string
      outer_id: string
      article_img: string
      edit_time: string
      zan: {
          article_id: string
        }[]
      beFollowed: {
        user_id: string
      }[]
      hot: string
      zan_status: boolean
      follow_status: boolean
      collection_status: boolean
      labels: {
        name : string
        description: string
        label_id: string
      }[]
      categorys: {
        category_id: string
      }[]
    }[]
}
}

export type SearchDataType = {
  author: {
    name: string
    user_img: string
    uuid: string
  }
} & ArticleType

export type SerachRes = {
  Search: {
    data: SearchDataType[],
    next: number
  }
}

export type ColumnArticlesRes = {
  getBaseMusterInfo: {
    gather_name: string
      gather_id: string
      gather_img: string
      article_description: string
      article_type: ArticleClassType,
      articles: {
        outer_id: string
      }[]
  }[]
}

export type SingleArticleRes = {
  getSingleInfo: {
    title: string
      article_img: string
      description: string
      outer_id: string
      article_type: ArticleClassType
    }[]
}

export type GatherArticleRes = {
  getGatherArtilces: {
    gather_img:string
   gather_name:string
   gather_id:string
   article_description:string
   article_type: ArticleClassType
 }[],
}

export type UserRecommendType = {
  userRecommend: {
    data: string[],
    next: number
  }
}

export type RelateRecommendType = {
  relateRecommend: {
    title: string,
    description: string,
    outer_id: string
  }[]
}

export type UserMessageType = {
  getUserMessage: {
    data: {
      timestamp: string
      article_id: string
      article_type: string
      title: string,
      info: {
        reading_time: string
      }
    }[],
    next: number
  }
}

export type AllArticlesInfo = {
  getAllArticles: {
    articles: {
        zan: {
          authorId: string
        }[],
        hot: string
      }[]
  }[]
}

export type ArticlePanelStatus = {
  getArticlePanelStatus: {
    zan_status: string
    follow_status: string
    collect_status: string
  }
}