import CartIcon from "@components/icons/cart-icon";
import { useCart } from "@contexts/cart/cart.context";
import { useUI } from "@contexts/ui.context";

const CartButton = () => {
	const { openCart } = useUI();
	const { totalItems } = useCart();
	function handleCartOpen() {
		return openCart();
	}

	return (
		<button
			className="flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none transform"
			onClick={handleCartOpen}
			aria-label="cart-button"
		>
			<CartIcon />
			<span className="cart-counter-badge flex items-center justify-center bg-heading text-white absolute -top-2.5 xl:-top-3 -end-2.5 xl:-end-3 rounded-full font-bold">
				{totalItems}
			</span>
		</button>
	);
};

export default CartButton;






// ------------------------------------------cart in other page-----------------------------------------

// import CartIcon from "@components/icons/cart-icon";
// import { useItemsCount } from "@contexts/cart/index.context";
// import Link from "next/link";

// const CartButton = () => {

// 	//  in order to re-render items are called | don't remove it!
// 	const { items } = useItemsCount();
// 	console.log(items)

// 	function getTotalItems() {
// 		if (typeof window !== 'undefined') {
// 			const a = localStorage.getItem("cart")
// 			if (a!==null) {
// 				return JSON.parse(a).length
// 			}
// 			return 0
// 		}
// 	}
	
// 	return (
// 		<Link href={'/cart'}>
// 			<div 
// 				className="flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none transform cursor-pointer"
// 				aria-label="cart-button"
// 			>
// 				<CartIcon />
// 				<span className="cart-counter-badge flex items-center justify-center bg-heading text-white absolute -top-2.5 xl:-top-3 -end-2.5 xl:-end-3 rounded-full font-bold">
// 					{getTotalItems()}
// 				</span>
// 			</div>
// 		</Link>
// 	);
// };

// export default CartButton;
