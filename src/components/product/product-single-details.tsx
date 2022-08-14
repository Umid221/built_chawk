import React, { useEffect, useState } from "react";
import Button from "@components/ui/button";
import Counter from "@components/common/counter";
import { useRouter } from "next/router";
import { useProductQuery } from "@framework/product/get-product";
import { getVariations } from "@framework/utils/get-variations";
import usePrice from "@framework/product/use-price";
import { useCart } from "@contexts/cart/cart.context";
import { generateCartItem } from "@utils/generate-cart-item";
import { ProductAttributes } from "./product-attributes";
import isEmpty from "lodash/isEmpty";
import Link from "@components/ui/link";
import { toast } from "react-toastify";
import { useWindowSize } from "@utils/use-window-size";
import Carousel from "@components/ui/carousel/carousel";
import { SwiperSlide } from "swiper/react";
import ProductAddons from "@components/product/product-addons";
import { useItemsCount } from "@contexts/cart/index.context";
import { useTranslation } from "next-i18next";
import { Collapse } from "@components/common/accordion";
import RelatedProducts from "@containers/related-products";
import Container from "@components/ui/container";

const productGalleryCarouselResponsive = {
	"768": {
		slidesPerView: 2,
	},
	"0": {
		slidesPerView: 1,
	},
};

const ProductSingleDetails: React.FC = () => {
	const {
		query: { slug },
		locale
	} = useRouter();

	const { t } = useTranslation("common");
	const { width } = useWindowSize();
	const { data, isLoading } = useProductQuery(slug as string);
	const { addItemToCart } = useCart();
	const [attributes, setAttributes] = useState<any>({});
	const [quantity, setQuantity] = useState(1);
	const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
	const [addons, setAddons] = useState<any>(data?.productAddons);
	const [disabledByAddons, setDisabledByAddons] = useState<any>([]);
	const [expanded, setExpanded] = useState<number>(0);
	const [priceWithAddons, setPriceWithAddons] = useState<number>(0);

	const { price, basePrice, discount } = usePrice(
		data && {
			amount: data.price,
			baseAmount: data.oldPrice,
			currencyCode: "USD",
		}
	);

	useEffect(()=>{
		!isLoading && setAddons(data?.productAddons) && setPriceWithAddons(data?.price)
	}, [isLoading])

	useEffect(()=>{
		const localStorageCart = localStorage.getItem("cart");
		if (localStorageCart===null) {
			localStorage.setItem('cart', JSON.stringify([]));
		}
		
	}, [])

	useEffect(()=>{
		// if a.includes(false) button is disabled
		const a = addons?.map((addon:any)=>{
			if (addon.required){
				if (addon.minAllowed<=addon.chosenModifiers?.length){
					const mod = addon.modifiers.map((modifier:any)=>{
						if (addon.chosenModifiers.includes(modifier.id)){
							const tagModifier = modifier.modifierTags.map((tag:any)=>{
								if (tag.required){
									if (modifier.chosenTags.includes(tag.id)){
										return true;
									}else {
										return false
									}
								}else {
									return true
								}
							})
							return !tagModifier?.includes(false)
						}
					})
					return !mod?.includes(false)
				}else {
					return false
				}
				
			}else{
				const mod = addon.modifiers.map((modifier:any)=>{
					if (addon.chosenModifiers?.includes(modifier.id)){
						const tagModifier = modifier.modifierTags.map((tag:any)=>{
							if (tag.required){
								if (modifier.chosenTags.includes(tag.id)){
									return true;
								}else {
									return false
								}
							}else {
								return true
							}
						})
						return !tagModifier?.includes(false)
					}
				})
				return !mod.includes(false)
			}
		})
		setDisabledByAddons(a)
		// setPriceWithAddons(0)
		let sum = 0
		addons?.map((addon: any) =>{
			addon.modifiers.map((modifier:any)=>{
				if (addon?.chosenModifiers?.includes(modifier.id)){
					sum+=modifier?.price
				}
			})
		});
		console.log(sum)
		setPriceWithAddons(data?.price+sum)
	}, [addons])

	useEffect(()=>{
		if (!isLoading && data?.stock == 0){
			setQuantity(0);
		}
	}, [data])

	const { changeItemsCount } = useItemsCount();

	if (isLoading) return <p>Loading...</p>;
	const variations = getVariations(data?.variations);

	const isSelected = !isEmpty(variations)
		? !isEmpty(attributes) &&
		  Object.keys(variations).every((variation) =>
				attributes.hasOwnProperty(variation)
		  )
		: true;

	let changed = false;

	function addToCart() {
		// ------cart-page --------------------------------

		// let cart = JSON.parse(localStorage.getItem('cart'));
		// cart?.forEach(item=>{
		// 	if (item.product.id === data?.id){
		// 		item.quantity += quantity
		// 		item.price += quantity * data?.price
		// 		changed = true;
		// 	}
		// })
		// if (!changed){
		// 	cart.push({
		// 		product: {...data, productAddons: addons},
		// 		quantity,
		// 		price: data?.price * quantity,
		// 	})
		// }
		// if (typeof window !== "undefined") {
		// 	window.addEventListener("storage", () => {
		// 		console.log('adding storage')
		// 	});
		// 	localStorage.setItem('cart', JSON.stringify(cart))
		// 	console.log('adding');
		// }

		// -------------- cart-modal --------------------------------

		if (!isSelected) return;
		// to show btn feedback while product carting
		setAddToCartLoader(true);
		setTimeout(() => {
			setAddToCartLoader(false);
		}, 600);

		setAttributes(data?.productAddons)
		const item = generateCartItem(data!, addons, priceWithAddons);
		addItemToCart(item, quantity);
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

	function handleAttribute(attribute: any) {
		setAttributes((prev:any) => ({
			...prev,
			...attribute,
		}));
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
		<div className="block lg:grid grid-cols-9 gap-x-10 xl:gap-x-14 pt-7 pb-10 lg:pb-14 2xl:pb-20 items-start">
			{width < 1025 ? (
				<Carousel
					pagination={{
						clickable: true,
					}}
					breakpoints={productGalleryCarouselResponsive}
					className="product-gallery"
					buttonGroupClassName="hidden"
				>
					{data?.images?.map((item, index: number) => (
						<SwiperSlide key={`product-gallery-key-${index}`}>
							<div className="col-span-1 transition duration-150 ease-in hover:opacity-90">
								<img
									src={
										process.env.NEXT_PUBLIC_GET_ATTACHMENT+item?.id ??
										"/assets/placeholder/products/product-gallery.svg"
									}
									alt={`${locale==='en'?data?.nameEng:data?.nameAr}--${index}`}
									className="object-cover w-full"
								/>
							</div>
						</SwiperSlide>
					))}
				</Carousel>
			) : (
				<div className="col-span-5 grid grid-cols-2 gap-2.5">
					{data?.images?.map((item, index: number) => (
						<div
							key={index}
							className="col-span-1 transition duration-150 ease-in hover:opacity-90"
						>
							<img
								src={
									process.env.NEXT_PUBLIC_GET_ATTACHMENT+item?.id ??
									"/assets/placeholder/products/product-gallery.svg"
								}
								alt={`${locale==='en'?data?.nameEng:data?.nameAr}--${index}`}
								className="object-cover w-full"
							/>
						</div>
					))}
				</div>
			)}

			<div className="col-span-4 pt-8 lg:pt-0">
				<div className="pb-7 border-b border-gray-300">
					<h2 className="text-heading text-lg md:text-xl lg:text-2xl 2xl:text-3xl font-bold hover:text-black mb-3.5">
						{locale==='en'?data?.nameEng:data?.nameAr}
					</h2>
					<p className="text-body text-sm lg:text-base leading-6 lg:leading-8">
						{locale==='en'?data?.detailsEng:data?.detailsAr}
					</p>
					<div className="flex items-center mt-5">
						<div className="text-heading font-bold text-base md:text-xl lg:text-2xl 2xl:text-4xl pe-2 md:pe-0 lg:pe-2 2xl:pe-0">
							<span className="font-semibold text-xl inline-block pe-2">{t("text-unit-price")} : </span> {price}
						</div>
						{discount && (
							<span className="line-through font-segoe text-gray-400 text-sm md:text-base lg:text-lg xl:text-xl ps-2">
								{basePrice}
							</span>
						)}
					</div>
					<div className="flex items-center mt-5">
						<span className="font-semibold text-black-500 text-xl inline-block pe-2">Price : </span>
						<div className="text-heading ml-5 font-bold text-base md:text-xl lg:text-2xl 2xl:text-4xl pe-2 md:pe-0 lg:pe-2 2xl:pe-0">
							 {priceWithAddons}
						</div>
					</div>
				</div>

				{/* <div className="pb-3 border-b border-gray-300">
					{Object.keys(variations).map((variation) => {
						return (
							<ProductAttributes
								key={variation}
								title={variation}
								attributes={variations[variation]}
								active={attributes[variation]}
								onClick={handleAttribute}
							/>
						);
					})}
				</div> */}
				<div className="flex items-top space-s-4 md:pe-32 lg:pe-12 2xl:pe-32 3xl:pe-48 border-b border-gray-300 py-4 my-4">
					<div>
						<Counter
							quantity={quantity}
							onIncrement={() => data?.stock && quantity<data?.stock && setQuantity((prev) => prev + 1)}
							onDecrement={() =>
								setQuantity((prev) => (prev !== 1 ? prev - 1 : 1))
							}
							disableDecrement={quantity === 1 || quantity === 0}
							disableIncrement={quantity === data?.stock || quantity === 0}
						/>
						<span className='text-sm text-red-500'>{checkLeftItems( data?.stock, quantity )}</span>
					</div>
					<div className={`w-full md:w-6/12 xl:w-full ${
								!isSelected && "bg-gray-400 hover:bg-gray-400"
							}`}> 
						<Button
							onClick={()=>{
								addToCart();
								if (!changed){
									changeItemsCount(1)
								}
							
							}}
							variant="slim"
							className={`sm:w-6/12 md:w-8/12 lg:w-full  xl:w-full ${
								!isSelected && "bg-gray-400 hover:bg-gray-400 "
							}`}
							disabled={!isSelected || data?.stock == 0 || disabledByAddons?.includes(false)}
							loading={addToCartLoader}
						>
							<span className="py-2 3xl:px-8">Add to cart</span>
						</Button>
						{disabledByAddons?.includes(false) && <div className="text-sm text-red-500">choose&nbsp;required&nbsp;addons</div>}
					</div>
				</div>
				{/* <div className="py-6">
					<ul className="text-sm space-y-5 pb-1">
						<li>
							<span className="font-semibold text-heading inline-block pe-2">
								Category:
							</span>
							<span>
								{data?.categories?.length>0 && data?.categories?.map((item, index)=>{
									if (data?.categories?.length-1!==index){
										return <Link className="transition hover:underline hover:text-heading" href={`/category/${item.id}?name=${item?.nameEng}&image=${item?.image?.id}`}>{(locale==='en'?item.nameEng:item.nameAr)+', '}</Link>
									}
									return <Link className="transition hover:underline hover:text-heading" href={`/category/${item.id}?name=${item?.nameEng}&image=${item?.image?.id}`}>{locale==='en'?item.nameEng:item.nameAr}</Link>
								})}
							</span>
						</li>
						{data?.tags && Array.isArray(data.tags) && (
							<li className="productTags">
								<span className="font-semibold text-heading inline-block pe-2">
									Tags:
								</span>
								{data.tags.map((tag) => (
									<Link
										key={tag.id}
										href={tag.slug}
										className="inline-block pe-1.5 transition hover:underline hover:text-heading last:pe-0"
									>
										{tag.name}
										<span className="text-heading">,</span>
									</Link>
								))}
							</li>
						)}
					</ul>
				</div> */}
				<div>
					<Collapse
							i={1}
							key={data?.id}
							title={"Addition"}
							translatorNS="review"
							content={<div className="mx-10">
								{locale==="en"?data?.additionalInformationEng:data?.additionalInformationAr}
							</div>}
							expanded={expanded}
							setExpanded={setExpanded}
							variant="transparent"
						/>
				</div>
				<ProductAddons data={data?.productAddons} locale={locale} productId={data?.id} setAddonsProduct={setAddons}/>
				
			</div>

		</div>
	);
};

export default ProductSingleDetails;