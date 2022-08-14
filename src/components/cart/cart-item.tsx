import Link from "@components/ui/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInOut } from "@utils/motion/fade-in-out";
import { IoIosCloseCircle } from "react-icons/io";
import Counter from "@components/common/counter";
import usePrice from "@framework/product/use-price";
import { ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
import {  useState } from "react";
import { useItemsCount } from "@contexts/cart/index.context";
import { useRouter } from "next/router";
import { Collapse } from "@components/common/accordion";
import { useCart } from "@contexts/cart/cart.context";

type CartItemProps = {
	item: any;
	setCartModified?: any;
};

const CartItem: React.FC<CartItemProps> = ({ item, setCartModified }) => {
	
	const { locale } = useRouter()
	const { t } = useTranslation("common");
	// const { changeItemsCount } = useItemsCount();
	const { addItemToCart, removeItemFromCart, clearItemFromCart } = useCart();
	const { price } = usePrice({
		amount: item.price,
		currencyCode: "USD",
	});
	const { price: totalPrice } = usePrice({
		amount: item.itemTotal,
		currencyCode: "USD",
	});
	const [cardProduct, setCardProduct] = useState(item)
	const [expanded, setExpanded] = useState<number>(0);
	const [hasAddons, setHasAddons] = useState<boolean>(false);

	function changeItemInCart(id:any, price: number, qnt: number){
		// @ts-ignore
		let cart = JSON.parse(localStorage.getItem('cart'));
		cart?.forEach( (pr:any) => {
			if (pr.product.id === id){
				pr.quantity += qnt
				pr.price += price
				setCardProduct( (a:any) => {
					return {
						...a,
						quantity: a.quantity + qnt,
						price: a.price + price
					}
				})
			}
		})
		localStorage.setItem('cart', JSON.stringify(cart))
		setCartModified((a:Boolean)=>!a)
	}

	// function clearItemFromCart(id:String) {
	// 	let cart = JSON.parse(localStorage.getItem('cart'));
	// 	cart = cart?.filter( (pr:any) => {
	// 		if (pr.product.id !== id){
	// 			return pr
	// 		}
	// 	})
	// 	setCardProduct(cart);
	// 	localStorage.setItem('cart', JSON.stringify(cart))
	// 	setCartModified((a:Boolean)=>!a)
	// }

	// const { price } = usePrice({
	// 	amount: item.price,
	// 	currencyCode: "USD",
	// });
	// const { price: totalPrice } = usePrice({
	// 	amount: item.itemTotal,
	// 	currencyCode: "USD",
	// });
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
console.log();

	return (
		<motion.div
			layout
			initial="from"
			animate="to"
			exit="from"
			variants={fadeInOut(0.25)}
			className={`group w-full h-auto justify-start items-center bg-white py-4 md:py-7 border-b border-gray-500 relative last:border-b-0`}
			title={locale==='en'?cardProduct?.product?.nameEng:cardProduct?.product?.nameAr}
		>
			<div className="flex">
				<div className="relative flex w-24 h-24 md:h-28 md:w-28 rounded-md overflow-hidden bg-gray-200 flex-shrink-0 cursor-pointer me-4">
					<Image
						src={process.env.NEXT_PUBLIC_GET_ATTACHMENT+((cardProduct?.image?.id)) ?? "/assets/placeholder/cart-item.svg"}
						width={112}
						height={112}
						loading="eager"
						alt={locale==='en'?cardProduct?.nameEng:cardProduct?.nameAr || "Product Image"}
						className="bg-gray-300 object-cover"
					/>
					<div
						className="absolute top-0 start-0 h-full w-full bg-black bg-opacity-30 md:bg-opacity-0 flex justify-center items-center transition duration-200 ease-in-out md:group-hover:bg-opacity-30"
						onClick={() => clearItemFromCart(item.id, item.attributes)}
						role="button"
					>
						<IoIosCloseCircle className="relative text-white text-2xl transform md:scale-0 md:opacity-0 transition duration-300 ease-in-out md:group-hover:scale-100 md:group-hover:opacity-100" />
					</div>
				</div>

				<div className="flex flex-col w-full overflow-hidden">
					<Link
						href={`${ROUTES.PRODUCT}/${cardProduct?.id}`}
						className="truncate text-sm text-heading mb-1.5 -mt-1"
					>
						{/* {generateCartItemName(locale==='en'?cardProduct?.nameEng:cardProduct?.nameAr, {})} */}
						{locale==='en'?cardProduct?.nameEng:cardProduct?.nameAr}
					</Link>
					<span className="text-sm text-gray-400 mb-2.5">
						{t("text-unit-price")} : &nbsp;
						{price}
					</span>

					<div className="flex items-end justify-between">
						<Counter
							quantity={item.quantity}
							onIncrement={() => addItemToCart(item, 1)}
							onDecrement={() => removeItemFromCart(item.id, item.attributes)}
							variant="dark"
						/>
						<span className="font-semibold text-sm md:text-base text-heading leading-5">
							{totalPrice}
						</span>
					</div>
				</div>
			</div>

			{/* <div className="relative flex flex-col items-center justify-center w-3/12">
				<Counter
					className=""
					quantity={cardProduct.quantity}
					onIncrement={() => changeItemInCart(cardProduct?.product?.id, cardProduct?.product?.price, 1)}
					onDecrement={() => changeItemInCart(cardProduct?.product?.id, cardProduct?.product?.price*(-1), -1)}
					variant="dark"
					disableDecrement={cardProduct.quantity === 1 || cardProduct.quantity === 0}
					disableIncrement={cardProduct.quantity === cardProduct.product?.stock || cardProduct.quantity === 0}
				/>
				<span className='absolute top-9 text-sm text-red-500'>{checkLeftItems( cardProduct.product.stock, cardProduct.quantity )}</span>
			</div>
			<div className="w-3/12 flex justify-center items-center">
				<span className="text-sm font-bold">
					Price : &nbsp;
					{cardProduct?.price}
				</span>
			</div>
			<div>
				<div
					className=" top-0 start-0 h-full w-full bg-opacity-30 md:bg-opacity-0 flex justify-center items-center transition duration-200 ease-in-out md:group-hover:bg-opacity-30"
					onClick={() => {
						clearItemFromCart(cardProduct.product.id)
						changeItemsCount(-1)
					}}
					role="button"
				>
					<IoIosCloseCircle className="relative text-2xl transform md:scale-0 md:opacity-0 transition duration-300 ease-in-out md:group-hover:scale-100 md:group-hover:opacity-100" />
				</div>
				</div>
			</div> */}
		<div className="mx-4 mt-3">
			{cardProduct?.attributes?.map((item: any, index: number) => {
				if (item.chosenModifiers?.length > 0) {
					return <div className="mt-4 space-y-4" key={item.id}>
						{/* {index===0 && <h3 className="font-bold text-black text-xl">Add ons</h3>} */}
						<div className="ml-2 relative">
							<Collapse
								inCart={true}
								i={index}
								key={item.id}
								title={<div className="text-lg">{locale==='en'?item.nameEng:item.nameAr}</div>}
								translatorNS="review"
								content={<div className="mx-10">
									<div className="space-y-3">
										{
											item.modifiers.map((modifier:any) =>
											<div key={modifier.id}>
												<div className="flex items-start">
													<div className="flex items-center h-5">
														<input checked={item.chosenModifiers?.includes(modifier.id)} id={`modifiers-${modifier.id}`} name="comments" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"/>
													</div>
													<div className="mx-3 text-sm">
														<label htmlFor={`modifiers-${modifier.id}`} className="font-medium text-gray-700">
															{locale==='en'?modifier.nameEng:modifier.nameAr}
															<span className="mx-8">${modifier.price}</span>
														</label>
													</div>
												</div>
												<div className="mx-10 mt-3 space-y-4">
													{item.chosenModifiers?.includes(modifier.id) && 
														modifier.modifierTags.length>0 && modifier.modifierTags.map((tag:any) => <div key={tag.id}>
															<div className="flex items-start">
																<div className="flex items-center h-5">
																	<input checked={modifier.chosenTags?.includes(tag.id)} id={`modifiers-${tag.id}`} name="comments" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"/>
																</div>
																<div className="mx-3 text-sm">
																	<label htmlFor={`modifiers-${tag.id}`} className="font-medium text-gray-700">
																		<span className="text-red-500">{tag?.required && '*'}</span>&nbsp;
																		{locale==='en'?tag.nameEng:tag.nameAr}
																	</label>
																</div>
															</div>
														</div>)}
												</div>
											</div>
											)
										}
									</div>
								</div>}
								expanded={expanded}
								setExpanded={setExpanded}
								variant="transparent"
							/>
						</div>
					</div>
				}
			})}
		</div>
		</motion.div>
	);
};

export default CartItem;
