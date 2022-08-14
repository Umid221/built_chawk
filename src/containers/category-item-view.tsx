import SectionHeader from "@components/common/section-header";
import ProductCard from "@components/product/product-card";
import ProductCardGridLoader from "@components/ui/loaders/product-card-grid-loader";
// import {usePromotionProductsQuery} from "@framework/product/get-all-flash-sale-products";
import Alert from "@components/ui/alert";
// import dynamic from "next/dynamic";
// import moment from 'moment';
// import {usePinnedBoxQuery} from "@framework/product/get-pinned-box";
import {useCategoryProductsQuery} from "@framework/product/get-category-products";
// import ProductOverlayCard from "@components/product/product-overlay-card";
// import {Product} from "@framework/types";
import {useEffect, useState} from "react";
// import Carousel from "@components/ui/carousel/carousel";
import CategoryItemSwiperView from "./category-item-swiper-view";
import {useRouter} from "next/router";
import Link from "next/link";
import {ROUTES} from "@utils/routes";
import {LOCALSTORAGE_BRANCH, LOCALSTORAGE_CATEGORY, PICKUP} from "../constantas/consts";


interface CategoryItemsProps {
    sectionHeading?: string;
    className?: string;
    category?: any;
    limit?: number
}

const CategoryItemView: React.FC<CategoryItemsProps> = ({
                                                            sectionHeading = "text-flash-sale",
                                                            className = "mb-12 md:mb-14 xl:mb-16",
                                                            category,
                                                        }) => {
    const [isSwiper, setIsSwiper] = useState(false)
    const [branch, setBranch] = useState<any>({})
    useEffect(() => {
        let a = localStorage.getItem(LOCALSTORAGE_BRANCH)
        let category = localStorage.getItem(LOCALSTORAGE_CATEGORY)
        // @ts-ignore
        let b = JSON.parse(a)
        setIsSwiper(false)
        if (b && category === PICKUP) {
            setBranch({branchId: b.id})

        } else {
            setBranch({})
        }
    }, [])

    // const dateTime = Date.now()
    // const time = moment(dateTime).format("YYYY-MM-DDThh:mm:ss.000")

    // const { data, isLoading, error } = usePromotionProductsQuery(time);

    const {data, error, isLoading} = useCategoryProductsQuery({
        id: category?.id, branch
    })
    const {locale} = useRouter();


    return (
        <div
            className={`${className} border border-gray-300 rounded-md pt-5 md:pt-6 lg:pt-7 pb-5 lg:pb-7 px-4 md:px-5 lg:px-7`}>
            <div className="flex justify-between items-center flex-wrap mb-5 md:mb-6">
                <SectionHeader sectionHeading={sectionHeading} className="mb-0"/>
                <Link
                    href={`${ROUTES.CATEGORY}/${category.id}?name=${locale === 'en' ? category?.nameEng : category?.nameAr}&image=${category?.image?.id}`}
                    className="cursor-pointer">Show more</Link>
            </div>
            {error ? (
                <Alert message={error?.message}/>
            ) : (
                isSwiper ?

                    <CategoryItemSwiperView type="rounded" isLoading={isLoading} data={data}/> :

                    <div
                        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-x-3 md:gap-x-5 xl:gap-x-7 gap-y-4 lg:gap-y-5 xl:lg:gap-y-6 2xl:gap-y-8">
                        {isLoading ? Array.from({length: 10}).map((_, idx) => (
                                <ProductCardGridLoader
                                    key={idx}
                                    uniqueKey={`flash-sale-${idx}`}
                                />
                            ))
                            : data?.content?.map((item: any) => {
                                return <ProductCard
                                    key={`product--key${item.id}`}
                                    product={item}
                                    imgWidth={324}
                                    imgHeight={324}
                                    variant="gridSlim"
                                    promotion={item}
                                />
                            })
                        }
                    </div>
            )}
        </div>
    )

    // <div className="grid grid-cols-4 grid-rows-2 gap-3 md:gap-5 xl:gap-7">
    // 				<ProductOverlayCard
    // 						key={`product--key${category.id}`}
    // 						product={category}
    // 						variant={"left"}
    // 						index={0}
    // 					/>
    // 				{data?.content?.slice(0, limit).map((product: any, idx: number) => (
    // 					<ProductOverlayCard
    // 						key={`product--key${product.id}`}
    // 						product={product}
    // 						variant={"left"}
    // 						index={idx+1}
    // 					/>
    // 				))}
    // 			</div>


    // return (
    // 	<div
    // 		className={`${className} border border-gray-300 rounded-md pt-5 md:pt-6 lg:pt-7 pb-5 lg:pb-7 px-4 md:px-5 lg:px-7`}
    // 	>
    // 		<div className="flex justify-between items-center flex-wrap mb-5 md:mb-6">
    // 			<SectionHeader sectionHeading={sectionHeading} className="mb-0" />
    // 			{/* <Countdown date={date} intervalDelay={1000} renderer={renderer} /> */}
    // 		</div>
    // 		{error ? (
    // 			<Alert message={error?.message} />
    // 		) : (
    // 			<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-x-3 md:gap-x-5 xl:gap-x-7 gap-y-4 lg:gap-y-5 xl:lg:gap-y-6 2xl:gap-y-8">
    // 				{isLoading && data?.productFlashSellGridTwo?.length
    // 					? Array.from({ length: 10 }).map((_, idx) => (
    // 							<ProductCardGridLoader
    // 								key={idx}
    // 								uniqueKey={`flash-sale-${idx}`}
    // 							/>
    // 					  ))
    // 					: data?.content?.map((item: any) => {
    // 							// return item.products.map((product: any) => {
    // 								return <ProductCard
    // 									key={`product--key${item.id}`}
    // 									product={item}
    // 									imgWidth={324}
    // 									imgHeight={324}
    // 									variant="gridSlim"
    // 									promotion={item}
    // 								/>
    // 							// })
    // 						})
    // 					}
    // 			</div>
    // 		)}
    // 	</div>
    // );
};

export default CategoryItemView;
