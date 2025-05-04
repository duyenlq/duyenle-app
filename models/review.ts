import type { Meta } from '@/models/meta';

export interface Review {
  data?: Array<{
    product_id: number | string,
    product_name: string,
    product_code: string,
    rate: number | string,
    message: string,
    created_at: Date | string,
    created_by: string
  }>,
  meta?: Meta
}

export interface CommentsByProductId {
  data?: Array<Comment>,
  meta?: Meta
}

export interface Comment {
  id?: number | string,
  product_id?: number | string,
  product_code?: string,
  product_name?: string,
  product_price?: number | string,
  product_slug?: string,
  product_thumbnail?: string,
  product_price_formatted?: string,
  user_id?: number | string,
  avatar?: string,
  user_name?: string,
  content?: string,
  rate?: number | string,
  type?: string,
  rate_name?: string,
  hashtag_rates?: Array<{
    id?: number | string,
    code?: string,
    is_choose?: number | string,
    value?: string,
    group_reason?: string,
    is_description?: number | string,
    type?: string
  }>,
  parent_id?: number | string,
  is_like?: number | string,
  like?: number | string,
  is_active?: number | string,
  count_childs?: number | string,
  count_comments?: number | string,
  childs?: [],
  comments?: [],
  images?: Array<{
    id?: string,
    createTime?: Date | string,
    updateTime?: Date | string,
    name?: string,
    folder?: string,
    size?: number | string,
    mimeType?: string
  }>,
  created_at?: Date | string,
  created_by?: string
}
