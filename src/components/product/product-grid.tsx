import ProductCard from "@components/product/product-card";
import type {FC} from "react";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import ProductFeedLoader from "@components/ui/loaders/product-feed-loader";
import {useCategoryProductsQuery} from "@framework/product/get-category-products";
import {LOCALSTORAGE_BRANCH, LOCALSTORAGE_CATEGORY, PICKUP} from "../../constantas/consts";

interface ProductGridProps {
    className?: string;
}

export const ProductGrid: FC<ProductGridProps> = ({className = ""}) => {
    const {query} = useRouter();
    const [branch, setBranch] = useState<any>({})
    useEffect(() => {
        let a = localStorage.getItem(LOCALSTORAGE_BRANCH)
        let category = localStorage.getItem(LOCALSTORAGE_CATEGORY)
        // @ts-ignore
        let b = JSON.parse(a)
        if (b && category === PICKUP) {
            setBranch({branchId: b.id})

        } else {
            setBranch({})
        }
    }, [])

    // const {
    // 	isFetching: isLoading,
    // 	isFetchingNextPage: loadingMore,
    // 	fetchNextPage,
    // 	hasNextPage,
    // 	data,
    // 	error,
    // } = useProductsQuery({ limit: 10, ...query });

    const {data, error, isLoading} = useCategoryProductsQuery({
        id: query.slug,
        branch
    })

    if (error) return <p>{error.message}</p>;

    // const { t } = useTranslation("common");/

    console.log(data);

    return (
        <>
            <div
                className={`grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-3 lg:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8 ${className}`}
            >
                {isLoading && !data?.content?.length ? (
                    <ProductFeedLoader limit={20} uniqueKey="search-product"/>
                ) : (
                    data?.content?.map((item: any) => {
                        return (
                            <ProductCard
                                key={`product--key${item.id}`}
                                product={item}
                                variant="grid"
                            />
                        );
                    })
                )}
            </div>
            <div className="text-center pt-8 xl:pt-14">
                {/* {hasNextPage && (
					<Button
						loading={loadingMore}
						disabled={loadingMore}
						onClick={() => fetchNextPage()}
						variant="slim"
					>
						{t("button-load-more")}
					</Button>
				)} */}
            </div>
        </>
    );
};
