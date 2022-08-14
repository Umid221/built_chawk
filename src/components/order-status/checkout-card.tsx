import usePrice from "@framework/product/use-price";
import { useCart } from "@contexts/cart/cart.context";
import { CheckoutItem } from "@components/checkout/checkout-card-item";
import { OrderCardFooterItem } from "./checkout-card-footer-item";
import { useTranslation } from "next-i18next";
import {OrderItem} from "@components/order-status/checkout-card-item";

const OrderCard: React.FC = (props:any) => {
	const { items, total, isEmpty } = useCart();
	const {orderData}=props
	const { price: subtotal } = usePrice({
		amount: orderData?.totalPrice,
		currencyCode: "USD",
	});
	console.log(orderData)
	const { t } = useTranslation("common");
	const checkoutFooter = [
		{
			id: 1,
			name: t("text-sub-total"),
			price: subtotal,
		},
		{
			id: 2,
			name: t("text-shipping"),
			price: t("text-free"),
		},
		{
			id: 3,
			name: t("text-total"),
			price: subtotal,
		},
	];
	return (
		<div className="pt-12 md:pt-0 2xl:ps-4">
			<h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
				{t("text-your-order")}
			</h2>
			<div className="flex p-4 rounded-md mt-6 md:mt-7 xl:mt-9 bg-gray-150 text-sm font-semibold text-heading">
				<span>{t("text-product")}</span>
				<span className="ms-auto flex-shrink-0">{t("text-sub-total")}</span>
			</div>

			{orderData?.products?.map((item: any) => <OrderItem item={item} key={item.id}/>)}

			{checkoutFooter.map((item: any) => (
				<OrderCardFooterItem item={item} key={item.id} />
			))}
		</div>
	);
};

export default OrderCard;
