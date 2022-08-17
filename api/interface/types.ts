export type createUserParam = {
  phone: string
}

export type getUserType = {
  name: string,
  open_id: string
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
  desrition: string,
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


type ArticleLabel = {
  label: string
}
export type Articles = {
  author: string
  article?: string
  title: string
  article_img: string
  description: string
  outer_id: string
  type: ArticleType
  zan_status: boolean,
  labels: string[]
  categorys: string,
  hot: string,
  zan: string
  befollowed: number,
  follow_status: boolean,
  author_name: string,
  author_img: string
}

export type LatestArticles = {
  recommendList: Articles[]
}

export type getArticleByIdRes = {
  getArticleById: Articles
}

export type ArticleType = 'MUSTER' | 'GATHER'

export type GatherArticleRes = {
  getGatherArtilces: ArticleMainType[]
}

export type MustherArticleRes = {
  getAllMuster: ArticleMainType[]
}

export type ArticleMainType = {

  // zan: string
  // hot: string
  // befollowed: string
  // outer_id: string
  // article_img: string
  // article_type: string,
  // edit_item: string,

  author_name: string;
  author: string;
  article_data: number;
  description: string;
  article_type: ArticleType;
  muster_id: string;
  muster_img: string;
  name: string;
  title: string,
  edit_time: string,
  labels: {
    Labels: {
      name: string
      description: string
      label_id: string
    }
  }[],
  article_id: string | null,
  outer_id: string,
  hot: string,
  zan: string,
  article_img: string
}

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
  article_id: string,
  type: string,
  title: string,
  time_stmap: string
}

export type GetDraft = {
  getDraft: draft[]
}

export type DymicRes = {
  dynamicApi: dynamicApi
}

export type dynamicApi = {
  description: string,
  title: string,
  id: string,
  article_img: string,
  type: ArticleType,
  edit_time: string,
  author: string,
  zan: string,
  hot: string,
  outer_id: string,
  author_img: string,
  author_name: string,
  name: string,
  user_img: string,
  open_id: string,
  zan_status: boolean,
  follow_status: boolean,
  collection_status: boolean,
  labels: string[],
  categorys: string,
  befollowed: number
}

export type WritingArticleType = {
  getWritingArticle: {
    muster_data: {
      article_data: {
        outer_id: string
      }[]
    }[],
    gather_data: {
      article_data: {
        outer_id: string
      }[]
    }[],
  }
}

export type BaseMusterInfo = {
  getBaseMusterInfo: {
    muster_data: {
      name: string | null,
      muster_id: string
    }[]
  }
}

export type RecordsRes = {
  getRecords: {
    article_data: {
      timestamp: string,
      title: string,
      description: string,
      author: string,
      hot: string,
      zan: string,
      zan_status: string
      id: string,
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
    label: string
  }
}

export type AllArticlesRes = {
  getAllArticles: {
    AllArticles: ArticleMainType[],
    next: number
  }
}


export type CollectionArticleRes = {
  getCollectionArticles: {
    list: dynamicApi[],
    next: number,
    count: number
  }
}

export type AddArticleRes = {
  article_id: string
}

export type MusterInfoByIdRes = {
  getMusterInfoById: {
    author: {
      name: string,
      user_img: string,
      uuid_user: string
    },
    name: string,
    article_data: {
      article: string,
      description: string,
      edit_time: string,
      hot: string,
      zan: string,
      title: string
    }[],
    muster_img: string,
    description: string
  }
}

