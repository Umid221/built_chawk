import { QueryKey } from "react-query";

export type CollectionsQueryOptionsType = {
  text?: string;
  collection?: string;
  status?: string;
  limit?: number;
};

export type CategoriesQueryOptionsType = {
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
};
export type ProductsQueryOptionsType = {
  type: string;
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
};

export type ShopsQueryOptionsType = {
  text?: string;
  shop?: Shop;
  status?: string;
  limit?: number;
};

export type QueryParamsType = {
  queryKey: QueryKey;
  pageParam?: string;
};

export type Collection = {
  id: number | string;
  name: string;
  slug: string;
  details?: string;
  image?: Attachment;
  icon?: string;
  products?: Product[];
  productCount?: number;
};
export type Brand = {
  id: number | string;
  name: string;
  slug: string;
  image?: Attachment;
  background_image?: any;
  [key: string]: unknown;
};
export type Tag = {
  id: string | number;
  name: string;
  slug: string;
};

export type OrderItem = {
  id: number | string;
  name: string;
  price: number;
  quantity: number;
};
export type Order = {
  id: string | number;
  name: string;
  slug: string;
  products: OrderItem[];
  total: number;
  tracking_number: string;
  customer: {
    id: number;
    email: string;
  };
  shipping_fee: number;
  payment_gateway: string;
};
export type Shop = {
  id: string | number;
  owner_id: string | number;
  owner_name: string;
  address: string;
  phone: string;
  website: string;
  ratings: string;
  name: string;
  slug: string;
  description: string;
  cover_image: Attachment;
  logo: Attachment;
  socialShare: any;
  created_at: string;
  updated_at: string;
}
// mine ----------------------------------------------------------------
export type Attachment = {
  fileSize: number;
  name: string;
  contentType: string;
  id: string;
  originalName: string;
};
export type StoreLogo = {
  data:{
    attachment: Attachment;
  },
  success: boolean,
  message: any,
};
export type Category = {
  id: number | string;
  nameEng: string;
  nameAr: string;
  detailsEng?: string;
  detailsAr?: string;
  image?: any;
  status?: boolean;
  products?: Product[];
}
export type PinnedBox = {
  titleEng: string;
  titleAr: string;
  id: string;
  status: boolean;
  products: Product[];
};
type Modifier = {
  color:        string;
  detailsAr:    string;
  detailsEng:   string;
  hasStock:     boolean;
  id:           string;
  index:        number;
  modifierTags: any[];
  nameAr:       string;
  nameEng:      string;
  price:        number;
  productAddon: {
                  id : string;
                };
  stock:        number;
}
export type ProductAddon = {
  detailsAr:  string;
  detailsEng: string;
  expanded:   boolean;
  id:         string;
  index:      number;
  maxAllowed: number;
  minAllowed: number;
  nameAr:     string;
  nameEng:    string;
  required:   boolean;
  showColors: boolean;
  status:     boolean;
  modifiers:  Modifier[],
}
export type Product = {
  label: any;
  index: number;
  content:[];
  image:any;
  nameAr: string;
  oldPrice: number;
  stock: number;
  id: number | string;
  status: boolean;
  outOfStock: boolean;
  price: number;
  detailsAr: string;
  allowBaseTax: boolean;
  nameEng: string;
  showStock: boolean;
  itemCode: string;
  allowInstructions: boolean;
  ordersCount: number;
  detailsEng: string;
  salesCount: number;
  allowStock: boolean;
  tax: number;
  images: Attachment[];
  categories?: Category[];
  productAddons?: ProductAddon[];
  additionalInformationAr: string;
  additionalInformationEng: string;

};
export type Social = {
  link: string;
  avatarColor: string;
  name: string;
  avatarBg: string;
  id: string;
  status: boolean;
  icon: string;
}
export type Contact = {
  supportEmail: any;
  email: string;
  supportPhone: any;
}

export type QueryOptionsType = {
  date:any;
};