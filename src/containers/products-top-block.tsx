import ProductListFeedLoader from "@components/ui/loaders/product-list-feed-loader";
import SectionHeader from "@components/common/section-header";
import Alert from "@components/ui/alert";
import {useEffect, useState} from "react";
import {LOCALSTORAGE_BRANCH, LOCALSTORAGE_CATEGORY, PICKUP} from "../constantas/consts";
import {useCategoriesQuery} from "@framework/category/get-all-categories";
import BrandCard from "@components/common/brand-card";

interface Props {
	sectionHeading: string;
	className?: string;
	carouselBreakpoint?: {} | any;
}

const ProductsTopBlock: React.FC<Props> = ({
	sectionHeading,
	className = "mb-12 md:mb-14 xl:mb-16",
}) => {
	const [branch, setBranch] = useState<any>({})
	useEffect(() => {
		let a = localStorage.getItem(LOCALSTORAGE_BRANCH)
		let category = localStorage.getItem(LOCALSTORAGE_CATEGORY)
		// @ts-ignore
		let b = JSON.parse(a)
		if (b && category === PICKUP) {
			setBranch({branchId:b.id})

		} else {
			setBranch({})
		}
	},[])

	const { data, isLoading, error } = useCategoriesQuery({branch});



	// @ts-ignore
	return (
		<div className={`${className}`}>
			<SectionHeader sectionHeading={sectionHeading} />
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-5 xl:gap-7 xl:-mt-1.5 2xl:mt-0">
				{error ? (
					<div className="col-span-full">
						<Alert message={error?.message} />
					</div>
				) : !data?.length && isLoading ? (
					<ProductListFeedLoader limit={4} />
				) : (
					data?.map((category) => (
						<BrandCard key={`brand--key${category.id}`} brand={category} />
						// <Card
					// item={category}
					// href={`${ROUTES.CATEGORY}/${category.id}?name=${category.nameEng}&image=${category.image?.id}`}
					// variant={"rounded"}
					//
					// effectActive={true}
					// size={ "large" }
					// />
					))
				)}
			</div>
		</div>
	);
};

export default ProductsTopBlock;
