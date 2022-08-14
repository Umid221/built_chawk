import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import CheckoutCard from "@components/checkout/checkout-card";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {GetStaticProps} from "next";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import http from "@framework/utils/http";
import {API_ENDPOINTS} from "@framework/utils/api-endpoints";
import OrderCard from "@components/order-status/checkout-card";
import {OrderFormInfo} from "@components/order-status/order-form-info";

export default function CheckoutPage() {
    const route = useRouter();
    const [orderData,setOrderData]=useState(null)
    const {orderId}=route.query
    console.log(route)
    useEffect(()=>{
       orderId && getOrder(orderId)
    },[orderId])

    console.log(orderData)
    async function getOrder(id:any){
        const {data} = await http.get(API_ENDPOINTS.GET_ORDER+id);
        console.log(data)
        setOrderData(data.data)
    }

    return (
        <>
            <Container>
                <div
                    className="py-14 xl:py-20 px-0 2xl:max-w-screen-2xl xl:max-w-screen-xl mx-auto flex flex-col md:flex-row w-full">
                    <div
                        className="md:w-full lg:w-3/5 flex  h-full flex-col -mt-1.5 overflow-y-hidden overflow-x-hidden">
                        <OrderFormInfo order={orderData}/>

                    </div>
                    {<div className="md:w-full lg:w-2/5 md:ms-7 lg:ms-10 xl:ms-14 flex flex-col h-full -mt-1.5">
                        <OrderCard orderData={orderData}/>
                    </div>}
                </div>
                {/* <Subscription /> */}
            </Container>
        </>
    );
}

CheckoutPage.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({locale}) => {
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
