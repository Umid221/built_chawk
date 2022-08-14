import BannerCard from "@components/common/banner-card";
import Carousel from "@components/ui/carousel/carousel";
import { SwiperSlide } from "swiper/react";
// import { promotionBanner } from "@framework/static/banner";
// import { ROUTES } from "@utils/routes";
// import { usePromotionBannersQuery } from "@framework/banner/get-promotion-banner";
import {usePromotionProductsQuery} from "@framework/product/get-all-flash-sale-products";
import moment from "moment";
import SectionHeader from "@components/common/section-header";

interface BannerProps {
	className?: string;
}

const breakpoints = {
	"0": {
		slidesPerView: 2,
	},
};

const BannerSliderBlock: React.FC<BannerProps> = ({
	className = "mb-12 md:mb-14 xl:mb-16",
}) => {

	const dateTime = Date.now()
	const time = moment(dateTime).format("YYYY-MM-DDThh:mm:ss.000")
	const { data} = usePromotionProductsQuery(time);

	return (
		<div className={`${className} mx-auto max-w-[1920px] overflow-hidden`}>
			<div className={`pl-8`}>
				<SectionHeader sectionHeading={"Pinned Box"} />
			</div>
			<div className="-mx-32 sm:-mx-44 lg:-mx-60 xl:-mx-72 2xl:-mx-80">
				<Carousel
					breakpoints={breakpoints}
					centeredSlides={true}
					loop={true}
					autoplay={{
						delay: 4000,
					}}
					pagination={{
						clickable: true,
					}}
					paginationVariant="circle"
					buttonGroupClassName="hidden"
				>
					{data?.map((banner: any) => (
						<SwiperSlide
							key={`banner--key${banner?.attachment?.id}`}
							className="px-1.5 md:px-2.5 xl:px-3.5"
						>
							<BannerCard
								banner={banner.attachment}
								effectActive={true}
								href={`${"promotion"}?id=${banner.id}`}
							/>
						</SwiperSlide>
					))}
				</Carousel>
			</div>
		</div>
	);
};

export default BannerSliderBlock;
