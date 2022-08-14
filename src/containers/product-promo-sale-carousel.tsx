import Carousel from "@components/ui/carousel/carousel";
import ProductCard from "@components/product/product-card";
import SectionHeader from "@components/common/section-header";
import {SwiperSlide} from "swiper/react";
import {useEffect, useState} from "react";
import {LOCALSTORAGE_BRANCH, LOCALSTORAGE_CATEGORY, PICKUP} from "../constantas/consts";
// import {useRouter} from "next/router";
import Link from "next/link";

interface ProductsProps {
	sectionHeading?: string;
	className?: string;
	category?: any;
	limit?: number
}


const breakpoints = {
	"1500": {
		slidesPerView: 5,
		spaceBetween: 28,
	},
	"1025": {
		slidesPerView: 4,
		spaceBetween: 20,
	},
	"768": {
		slidesPerView: 3,
		spaceBetween: 20,
	},
	"480": {
		slidesPerView: 3,
		spaceBetween: 12,
	},
	"0": {
		slidesPerView: 2,
		spaceBetween: 12,
	},
};

const ProductsPromoCarousel: React.FC<ProductsProps> = ({
	sectionHeading = "text-flash-sale",
	className = "mb-10 md:mb-12 xl:mb-14",
    category,

                                                            }) => {
    const [branch, setBranch] = useState<any>({})
	console.log(category)
    useEffect(() => {
        let a = localStorage.getItem(LOCALSTORAGE_BRANCH)
        let category = localStorage.getItem(LOCALSTORAGE_CATEGORY)
        // @ts-ignore
		let b = JSON.parse(a)
        if (b && category === PICKUP) {
            setBranch({branchId: b.id})
			console.log(branch)
        } else {
            setBranch({})
        }
    }, [])


	return (
		<div className={`${className} 2xl:pt-2`}>
			<div className="flex justify-between items-center flex-wrap mb-5 md:mb-6">
				<SectionHeader sectionHeading={sectionHeading} className="mb-0" />
				<Link href={`pinned_box`} className={`cursor-pointer`} >Show More</Link>
			</div>
			{(
				<Carousel
					autoplay={{
						delay: 3500,
					}}
					breakpoints={breakpoints}
					buttonGroupClassName="-mt-10 md:-mt-12 xl:-mt-14"
				>
					{ category?.products?.map((product: any) => (
								<SwiperSlide key={`product--key-${product.id}`}>
									<ProductCard
										product={product}
										imgWidth={335}
										imgHeight={335}
										variant="gridSlim"
									/>
								</SwiperSlide>
						  ))}
				</Carousel>
			)}
		</div>
	);
};

export default ProductsPromoCarousel;
