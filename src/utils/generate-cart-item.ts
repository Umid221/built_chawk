import { Product } from "@framework/types";
import isEmpty from "lodash/isEmpty";

interface Item {
  id: string | number;
  name: string;
  slug: string;
  image: {
    thumbnail: string;
    [key: string]: unknown;
  };
  price: number;
  sale_price?: number;
  [key: string]: unknown;
}
export function generateCartItem(item: Product, attributes: any, priceWithAddons:number) {
  const { id, nameEng, nameAr, images, price } = item;
  return {
    // id: !isEmpty(attributes)
    //   ? `${id}.${Object.values(attributes).join(".")}`
    //   : id,
    id,
    nameEng,
    nameAr,
    image: images[0],
    price: priceWithAddons,
    attributes,
  };
}
