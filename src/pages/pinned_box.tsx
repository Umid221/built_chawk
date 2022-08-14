import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import {GetStaticProps} from "next";
import {QueryClient} from "react-query";
import {dehydrate} from "react-query/hydration";
import {API_ENDPOINTS} from "@framework/utils/api-endpoints";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import http from "@framework/utils/http";
import {usePinnedBoxQuery} from "@framework/product/get-pinned-box";
import SectionHeader from "@components/common/section-header";
import ProductCardGridLoader from "@components/ui/loaders/product-card-grid-loader";
import ProductCard from "@components/product/product-card";

export default function Promotion() {
    const {query} = useRouter()
    const [promo, setPromo] = useState(null)
    console.log(query)
    useEffect(() => {
        query.id && getTiming(query?.id)
    }, [query])
    const {data} = usePinnedBoxQuery()
    console.log(promo)

    async function getTiming(id: any) {
        const {data} = await http.get(API_ENDPOINTS.GET_PROMO_BY_ID + "?id=" + id);
        setPromo(data.data)
    }

    return (
        <>
            <Container>
                <ProductsPinnedBlock data={data?.length>0?data[0]:[]}/>
            </Container>
        </>
    );
}

Promotion.Layout = Layout;
export const getStaticProps: GetStaticProps = async ({locale}) => {
    const queryClient = new QueryClient();


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


interface ProductsProps {
    sectionHeading?: string;
    className?: string;
    date?: any;
    data: any
}

const ProductsPinnedBlock: React.FC<ProductsProps> = ({
                                                          className = "mb-12 md:mb-14 xl:mb-16",
                                                          data
                                                      }) => {
    console.log(data)
    const {locale} = useRouter()



    return (
        <div
            className={`${className}  rounded-md pt-5 md:pt-6 lg:pt-7 pb-5 lg:pb-7 px-4 md:px-5 lg:px-7`}
        >
            {console.log(data)}
            <div className="flex justify-between items-center flex-wrap mb-5 md:mb-6">
                <SectionHeader sectionHeading={locale === 'en' ? data.titleEng : data.titleAr} className="mb-0"/>
            </div>
            {(
                <div
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-x-3 md:gap-x-5 xl:gap-x-7 gap-y-4 lg:gap-y-5 xl:lg:gap-y-6 2xl:gap-y-8">
                    {data?.productFlashSellGridTwo?.length
                        ? Array.from({length: 10}).map((_, idx) => (
                            <ProductCardGridLoader
                                key={idx}
                                uniqueKey={`flash-sale-${idx}`}
                            />
                        ))
                        : data?.products?.map((product: any) => {
                            return <ProductCard
                                key={`product--key${product.id}`}
                                product={product}
                                imgWidth={324}
                                imgHeight={324}
                                variant="gridSlim"
                                promotion={data}
                            />
                        })
                    }
                </div>
            )}
        </div>
    );
};