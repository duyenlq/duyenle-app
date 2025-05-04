import type { Meta } from '@/models/meta'

export interface Product {
  id: number | string,
  code: string,
  name: string,
  slug: string,
  price_formatted: string,
  promotion_price_formatted: string,
  percentage_price_old: string,
  special_percentage: string,
  special_percentage_formatted: string,
  promotion_price: string | number,
  special_formatted?: string,
  sellout_formatted: string,
  net_price_formatted: string,
  retail_price_formatted: string,
  discount_percentage: string,
  short_description: string,
  description?: string,
  thumbnail: string,
  feature_img: string,
  created_at?: Date | string,
  updated_at?: Date | string,
  category_slug?: string,
  iframe_image_promotion?: Array<string>,
  product_name?: string,
  product_thumb?: string,
  old_product_price?: number | string,
  old_product_price_formatted?: string,
  star_rating?: string | number,
  sold_count?: string | number,
  order_count?: string | number,
  gallery_images?: Array<{
    type: string,
    id: number | string,
    url: string
  }>,

  attribute_info?: Array<{
    key: string,
    value: string
  }>, 
  category?: string,
  brand?: {
    id?: number | string,
    name?: string
  },
  sku?: string,
  product_parameter_value: string,
  categories?: string
}

export interface Spec {
  title: string,
  key: Array<{
    key: string,
    value: string,
    code: string,
    is_filter: number | string,
    selectedItems: Array<{
      id: number | string,
      name: string
    }>
  }>
}

export interface GetProductBySlug {
  data: Product,
  meta: Meta
}
export interface GetProductList {
  data: Array<Product> ,
  meta: Meta
}

export interface GetProductLiteQuery {
  limit?: number | string,
  name?: string,
  status?: boolean | string,
  category_code?: string,
  page?: number | string,
  category_slug?: string
}
export interface GetProductListsQuery {
  limit?: number | string,
  name?: string,
  status?: boolean | string,
  category_code?: string,
  page?: number | string,
  category_slug?: string
}

export interface GetCategoryListQuery {
  code?: string,
  name?: string
}

export interface Slide {
  id: string | number,
  image: string
}
