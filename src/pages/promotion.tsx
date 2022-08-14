import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import {GetStaticProps} from "next";
import {QueryClient} from "react-query";
import {dehydrate} from "react-query/hydration";
import {API_ENDPOINTS} from "@framework/utils/api-endpoints";
// import {fetchFlashSaleProducts} from "@framework/product/get-all-flash-sale-products";
import {fetchCategories} from "@framework/category/get-all-categories";
import {fetchNewArrivalProducts} from "@framework/product/get-all-new-arrival-products";
import {fetchBrands} from "@framework/brand/get-all-brands";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

import ProductsFlashSaleBlock from "@containers/product-flash-sale-block";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import http from "@framework/utils/http";

export default function Promotion() {
    const {query} = useRouter()
    const [promo, setPromo] = useState<any>(null)
    console.log(query)
    useEffect(() => {
       query.id&&getTiming(query?.id)
    }, [query])

    async function getTiming(id:any) {
        const {data} = await http.get(API_ENDPOINTS.GET_PROMO_BY_ID + "?id=" + id);
        setPromo(data.data)
    }

    return (
        <>
            <Container>
                <ProductsFlashSaleBlock data={promo} date={promo?.endDate}/>
            </Container>
        </>
    );
}

Promotion.Layout = Layout;
export const getStaticProps: GetStaticProps = async ({locale}) => {
    const queryClient = new QueryClient();


    await queryClient.prefetchQuery(
        [API_ENDPOINTS.CATEGORIES, {limit: 10}],
        fetchCategories
    );
    await queryClient.prefetchQuery(
        [API_ENDPOINTS.NEW_ARRIVAL_PRODUCTS, {limit: 10}],
        fetchNewArrivalProducts
    );
    await queryClient.prefetchQuery(
        [API_ENDPOINTS.BRANDS, {limit: 0}],
        fetchBrands
    );

    return {
        props: {
            dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
            ...(await serverSideTranslations(locale!, [
                "common",
                "forms",
                "menu",
                "footer",
            ])),
        },
        revalidate: 60,
    };
};
