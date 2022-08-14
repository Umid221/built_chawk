import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import PageHeader from "@components/ui/page-header";
import CheckoutCard from "@components/checkout/checkout-card";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import { CheckoutContact } from "@components/checkout/components/checkout-form-contact";
import { CheckoutAddress } from "@components/checkout/components/checkout-form-address";
import { CheckoutAddressInfo } from "@components/checkout/components/checkout-form-address-info";
import { useState } from "react";
import {CheckoutPayType} from "@components/checkout/components/checkout-form-paytype";
import {CheckoutFormInfo} from "@components/checkout/components/checkout-form-info";
import {CheckoutThank} from "@components/checkout/components/checkout-thanks";

export default function CheckoutPage() {
	const[comp,setComp]=useState<any>(1)
	const[text,setText]=useState<string>('')

	function changeComponent(page:number){
		setComp(page)

	}
	function prevComponent(page:number){

		setComp(page)
	}
	// @ts-ignore
	// @ts-ignore
	console.log(comp)
	return (
		<>
			<PageHeader pageHeader="text-page-checkout" />
			<Container>
				<div className="py-14 xl:py-20 px-0 2xl:max-w-screen-2xl xl:max-w-screen-xl mx-auto flex flex-col md:flex-row w-full">
					<div className="md:w-full lg:w-3/5 flex  h-full flex-col -mt-1.5 overflow-y-hidden overflow-x-hidden">
						{comp===1?<CheckoutContact nextComponent={changeComponent} />:
						comp===2?<CheckoutAddress prevComponent={prevComponent}  nextComponent={changeComponent} />:
						comp===3?<CheckoutAddressInfo prevComponent={prevComponent} nextComponent={changeComponent}/>:
						comp===4?<CheckoutPayType nextComponent={changeComponent} prevComponent={prevComponent} />:
						comp===5?<CheckoutFormInfo nextComponent={changeComponent} prevComponent={prevComponent} setText={setText} />:
                        comp===6?<CheckoutThank nextComponent={changeComponent} prevComponent={prevComponent} thank={text}/>:""}

					</div>
					{<div className="md:w-full lg:w-2/5 md:ms-7 lg:ms-10 xl:ms-14 flex flex-col h-full -mt-1.5">
						<CheckoutCard/>
					</div>}
				</div>
				{/* <Subscription /> */}
			</Container>
		</>
	);
}

CheckoutPage.Layout = Layout;

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
