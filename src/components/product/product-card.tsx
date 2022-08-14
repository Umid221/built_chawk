import cn from "classnames";
import Image from "next/image";
import {FC, useEffect, useState} from "react";
import usePrice from "@framework/product/use-price";
import {Product} from "@framework/types";
import {useRouter} from "next/router";
import {ROUTES} from "@utils/routes";
import Button from "@components/ui/button";
import {generateCartItem} from "@utils/generate-cart-item";
import {useCart} from "@contexts/cart/cart.context";
import {toast} from "react-toastify";
import {useWindowSize} from "react-use";
import Counter from "@components/common/counter";

interface ProductProps {
  product: Product;
  className?: string;
  contactClassName?: string;
  imageContentClassName?: string;
  variant?: "grid" | "gridSlim" | "list" | "listSmall";
  imgWidth?: number | string;
  imgHeight?: number | string;
  imgLoading?: "eager" | "lazy";
  promotion?: any;
}

const ProductCard: FC<ProductProps> = ({
  product,
  className = "",
  contactClassName = "",
  imageContentClassName = "",
  variant = "list",
  imgWidth = 340,
  imgHeight = 440,
  imgLoading,
  promotion,
}) => {
  const router = useRouter();
  const placeholderImage = `/assets/placeholder/products/product-${variant}.svg`;
  // const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
  // const [attributes, setAttributes] = useState<any>({});
  const [quantity, setQuantity] = useState<number>(0);
  const [quantitySingleItem, setQuantitySingleItem] = useState<number>(0);
  const [item, setItem] = useState<any>({});

  const { width } = useWindowSize();
  const { addItemToCart, removeItemFromCart, items } = useCart();
  // setItem(items.find(item=>item.id===product.id));
  useEffect(() => {
    setItem(items.find(item=>item.id===product.id));
    setQuantity(0)
    items.map((item) => {
      if (item?.id===product.id){
        // @ts-ignore
        setQuantity(prev=>prev+item?.quantity)
      }
    })
  }, [items])
  
  useEffect(()=>{
    if (JSON.stringify(item?.attributes)===JSON.stringify(product.productAddons)){
      setQuantitySingleItem(item?.quantity)
    }
  }, [item])


  const { price, basePrice, discount } = usePrice({
    amount: product.price,
    baseAmount: product.oldPrice,
    currencyCode: "USD",
  });
  function handleProductView() {
    router.push(`${ROUTES.PRODUCT}/${product.id}`, undefined, {
      locale: router.locale,
    });
  }

  const requiredAddonHave = (product?.productAddons?.map(addon => addon.required))?.includes(true)

  const handleProductCartButton = (e:any) => {
    if (!requiredAddonHave){
      e.stopPropagation()
      setQuantitySingleItem(prev=>prev+1)
      // setAddToCartLoader(true);
      setTimeout(() => {
        // setAddToCartLoader(false);
      }, 600);

      // setAttributes(product?.productAddons)
      const item = generateCartItem(product!, product.productAddons, product?.price);
      console.log(item)
      addItemToCart(item, 1);
      toast("Added to the bag", {
        progressClassName: "fancy-progress-bar",
        position: width > 768 ? "bottom-right" : "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }

  function checkLeftItems(stock:number, qty: number) {
		if (stock > 0){
			if (stock-qty<=5){
				switch (stock-qty) {
					case 0:
						return 'no item left';
					case 1:
						return 'only 1 item left';
					default:
						return `only ${stock-qty} items left`;
				}
			}
		}else if (stock===0){
			return 'no item left';
		}
	}
  
	return (
    <div 
      className="flex flex-col justify-between gap-5 group box-border cursor-pointer rounded-md overflow-hidden"
      onClick={handleProductView}
      role="button"
      title={router.locale==='en'?product.nameEng:product.nameAr}
    >
      <div
        className={cn(
          "group flex ",
          {
            "pe-0 pb-2 lg:pb-3 flex-col items-start bg-white transition duration-200 ease-in-out transform hover:-translate-y-1 hover:md:-translate-y-1.5 hover:shadow-product":
              variant === "grid",
            "pe-0 md:pb-1 flex-col items-start bg-white": variant === "gridSlim",
            "items-center bg-transparent border border-gray-100 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-listProduct":
              variant === "listSmall",
            "flex-row items-center transition-transform ease-linear bg-gray-200 pe-2 lg:pe-3 2xl:pe-4":
              variant === "list",
          },
          className
        )}
      >
        <div
          className={cn(
            "flex",
            {
              "mb-3 md:mb-3.5": variant === "grid",
              "mb-3 md:mb-3.5 pb-0": variant === "gridSlim",
              "flex-shrink-0 w-32 sm:w-44 md:w-36 lg:w-44":
                variant === "listSmall",
            },
            imageContentClassName
          )}
        >
          <Image
            src={(product?.images.length>0 && process.env.NEXT_PUBLIC_GET_ATTACHMENT+product?.images[0]?.id) || placeholderImage}
            width={imgWidth}
            height={imgHeight}
            loading={imgLoading}
            quality={100}
            alt={router.locale==='en'?product.nameEng:product.nameAr || "Product Image"}
            className={cn("bg-gray-300 object-cover rounded-s-md", {
              "w-full rounded-md transition duration-200 ease-in group-hover:rounded-b-none":
                variant === "grid",
              "rounded-md transition duration-150 ease-linear transform group-hover:scale-105":
                variant === "gridSlim",
              "rounded-s-md transition duration-200 ease-linear transform group-hover:scale-105":
                variant === "list",
            })}
          />
        </div>
        <div
          className={cn(
            "w-full overflow-hidden",
            {
              "md:px-2.5 xl:px-4": variant === "grid",
              "ps-0": variant === "gridSlim",
              "px-4 lg:px-5 2xl:px-4": variant === "listSmall",
            },
            contactClassName
          )}
        >
          <h2
            className={cn("text-heading font-semibold truncate mb-1", {
              "text-sm md:text-base": variant === "grid",
              "md:mb-1.5 text-sm sm:text-base md:text-sm lg:text-base xl:text-lg":
                variant === "gridSlim",
              "text-sm sm:text-base md:mb-1.5 pb-0": variant === "listSmall",
              "text-sm sm:text-base md:text-sm lg:text-base xl:text-lg md:mb-1.5":
                variant === "list",
            })}
          >
            {router.locale==='en'?product.nameEng:product.nameAr}

            {quantity>0 && <span className='text-2xl text-green-500 ml-3'>{quantity}x</span>}
          </h2>
          {/*{(router.locale==='en'?product?.detailsEng:product?.detailsAr) && (*/}
          {/*  <p className="text-body text-xs lg:text-sm leading-normal xl:leading-relaxed max-w-[250px] truncate">*/}
          {/*    {router.locale==='en'?product?.detailsEng:product?.detailsAr}*/}
          {/*  </p>*/}
          {/*)}*/}
          {promotion?.title && (
            <div className="text-sm text-red-500">
              {promotion?.title}
            </div>
          )}
          <div
            className={`text-heading font-semibold text-sm sm:text-base mt-1.5 space-s-2 ${
              variant === "grid"
                ? "lg:text-lg lg:mt-2.5"
                : "sm:text-xl md:text-base lg:text-xl md:mt-2.5 2xl:mt-3"
            }`}
          >
            <span className="inline-block">{price}</span>
            {discount && (
              <del className="sm:text-base font-normal text-gray-800">
                {basePrice}
              </del>
            )}
          </div>
        </div>
		</div>
      <div className="w-full relative h-14" onClick={(e)=>!requiredAddonHave && e.stopPropagation()}>
        {
          quantity > 0 && !requiredAddonHave ?
            <div>
              <Counter
                quantity={quantitySingleItem}
                onIncrement={() => {
                  const item = generateCartItem(product!, product?.productAddons, product?.price);
                  addItemToCart(item, 1)
                  setQuantitySingleItem(prev=>prev+1)
                }}
                onDecrement={() => {
                  removeItemFromCart(item?.id, item.attributes)
                  setQuantitySingleItem(prev=>prev-1)
                }}
                disableIncrement={quantity === product?.stock || quantity === 0}
                variant="productCart"
                className="h-12"
              />
              <span className='text-sm text-red-500 absolute -top-5 right-0'>{checkLeftItems( product?.stock, quantity )}</span>
            </div>:
          <div>
            <Button variant="productCart" disabled={!(product?.stock>0)} onClick={handleProductCartButton}>{requiredAddonHave?"Price on selection":"Add to order"}</Button>
            <span className='text-sm text-red-500 absolute -top-5 right-0 z-10'>{product?.stock===0||product?.stock===null ? 'no item left':''}</span>
          </div>
        }
      </div>
    </div>
  );
};

export default ProductCard;