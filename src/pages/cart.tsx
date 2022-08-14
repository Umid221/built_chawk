import Scrollbar from "@components/common/scrollbar";
import { useCart } from "@contexts/cart/cart.context";
import { motion } from "framer-motion";
import { fadeInOut } from "@utils/motion/fade-in-out";
import { useUI } from "@contexts/ui.context";
import usePrice from "@framework/product/use-price";
import { IoClose } from "react-icons/io5";
import Link from "@components/ui/link";
import { ROUTES } from "@utils/routes";
import cn from "classnames";
import { useTranslation } from "next-i18next";
import CartItem from "@components/cart/cart-item";
import EmptyCart from "@components/cart/empty-cart";
import { Fragment, useEffect, useMemo, useState } from "react";
import Layout from "@components/layout/layout";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Button from "@components/ui/button";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from '@heroicons/react/solid'

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

export default function Cart() {
	// const router = 
	const { t } = useTranslation("common");
	const { closeCart } = useUI();
	// const { isEmpty } = useCart();
	// const { items, total, isEmpty } = useCart();

    const [cartModified, setCartModified] = useState(false)
	const [items, setItems] = useState([])
	const [total, setTotal] = useState(0)
	const [deliveryType, setDeliveryType] = useState('Mode of delivery')
	
    function getItems() {
		if (typeof window !== 'undefined') {
			const a = localStorage.getItem("cart")
			if (a!==null) {
				setItems(JSON.parse(a))
				return JSON.parse(a)
			}
			return []
		}
    }

	useEffect(()=>{
		setCartModified(true)
	}, [])


	useEffect(()=>{
		getItems()
	}, [cartModified])
	
	// const items = useMemo(() => getItems(), [cartModified])
	
	function calculateTotal(){
		return items?.reduce((acc : any,decc:any)=> acc + decc.price, 0)
	}

	// function calculateTotalDelivery(){
	// 	return items?.reduce((acc : any,decc:any)=> acc + decc.price, 0)
	// }

	useEffect(()=>{
		setTotal(calculateTotal())
	}, [items])

	// const total = useMemo(() => calculateTotal(), [items])
	
	const { price: cartTotal } = usePrice({
		amount: total,
		currencyCode: "USD",
	});

	return (
		<div className="flex flex-col w-full h-full items-center my-10 bg-gray-300 p-20">
			<div className="flex w-11/12 bg-white h-full mx-5 md:mx-7 my-5 md:mb-7 rounded-2xl" style={{boxShadow: "0 5px 10px 0px black"}}>
				<div className={"cart-scrollbar w-9/12 flex-grow pb-3 bg-white-100 overflow-y-scroll h-full"}>
					<div className="w-full flex justify-between items-center relative ps-5 md:ps-7 py-0.5 border-b border-gray-100">
						<h2 className="font-bold text-xl md:text-2xl m-0 text-heading">
							{t("text-shopping-cart")}
						</h2>
						<div
							className="flex text-lg items-center justify-center text-gray-800 px-4 md:px-6 py-6 lg:py-8 focus:outline-none transition-opacity hover:opacity-60"
							aria-label="close"
						>
							<span>{items?.length} items</span>
						</div>
					</div>
					{items?.length>0 ? (
						<Scrollbar className="cart-scrollbar w-full flex-grow">
							<div className="w-full">
								{items?.map((item:any) => (
									<CartItem item={item} key={item?.product.id} setCartModified={setCartModified} />
								))}
							</div>
						</Scrollbar>
					) : (
						<motion.div
							layout
							initial="from"
							animate="to"
							exit="from"
							variants={fadeInOut(0.25)}
							className="px-5 md:px-7 pt-8 pb-5 flex justify-center flex-col items-center"
						>
							<EmptyCart />
							<h3 className="text-lg text-heading font-bold pt-8">
								{t("text-empty-cart")}
							</h3>
						</motion.div>
					)}
				</div>
				<div
					className="flex flex-col rounded-r-2xl pb-3 hover:bg-gray-400 w-3/12"
					onClick={closeCart}
					style={{ backgroundColor: 'rgb(200,200,200)'}}
				>
					<div className="w-full flex justify-between items-center relative md:ps-7 py-0.5 border-b border-gray-100">
						<h2 className="font-bold text-xl md:text-2xl m-0 text-gray-700 py-6 lg:py-8">
							Summary
						</h2>
					</div>
					<div
						// href={isEmpty === false ? ROUTES.CHECKOUT : "/"}
						className={cn(
							"w-full px-5 py-3 md:py-4 flex items-center justify-between rounded-md text-sm sm:text-base focus:outline-none transition duration-300",
						)}
					>
						<span className="mt-0.5 py-0.5">
							{/* {t("text-proceed-to-checkout")} */}
							ITEMS
						</span>
						<span className="mt-0.5 py-0.5">
							{/* <span className="border-s border-white pe-5 py-0.5" /> */}
							{cartTotal}
						</span>
					</div>
					<div className="px-5 font-semibold">
						<h3>Mode of delivery</h3>
						{/* <select className="px-3 py-1 w-full bg-gray-300 rounded-md mt-2">
							<option className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" id="menu-item-0">Delivery</option>
							<option className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" id="menu-item-1">Pickup</option>
						</select> */}
						<Menu as="div" className="relative inline-block text-left w-full mt-3">
							<div>
								<Menu.Button className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-300 text-sm font-medium text-gray-550 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
									{deliveryType}
									<ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
								</Menu.Button>
							</div>
							<Transition
								as={Fragment}
								enter="transition ease-out duration-100"
								enterFrom="transform opacity-0 scale-95"
								enterTo="transform opacity-100 scale-100"
								leave="transition ease-in duration-75"
								leaveFrom="transform opacity-100 scale-100"
								leaveTo="transform opacity-0 scale-95"
							>
								<Menu.Items className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
								<div className="py-1">
									<Menu.Item onClick={()=>setDeliveryType('Delivery')}>
										<div className={classNames(
												'hover:bg-gray-100 text-gray-900',
												'block px-4 py-2 text-sm'
										)}>Delivery</div>
									</Menu.Item>
									<Menu.Item onClick={()=>setDeliveryType('Pickup')}>
										<div className={classNames(
												'hover:bg-gray-100 text-gray-900',
												'block px-4 py-2 text-sm'
										)}>Pickup</div>
									</Menu.Item>
								</div>
								</Menu.Items>
							</Transition>
						</Menu>
					</div>
					<div className=" pt-5 px-5 font-semibold">
						<h3>Give Code</h3>
						<input className="px-3 py-2 w-full text-sm hover:bg-gray-50 focus:bg-gray-50 bg-gray-300 rounded-md mt-2 placeholder:text-xs text-black" placeholder="Enter your code"/>
					</div>
					<hr className="my-5 px-5"/>
					<div className="px-5 flex justify-between">
						<span>Total Price</span>
						<span>{cartTotal}</span>
					</div>
					<div className="px-5 py-3">
						<Button className="w-full" >Checkout</Button>
					</div>
				</div>

			</div>
		</div>
	);
}

Cart.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale!, [
				"common",
				"forms",
				"menu",
				"footer",
			])),
		},
	};
};