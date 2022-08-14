import Card from "@components/common/card";
import Carousel from "@components/ui/carousel/carousel";
import CardLoader from "@components/ui/loaders/card-loader";
import CardRoundedLoader from "@components/ui/loaders/card-rounded-loader";
import { ROUTES } from "@utils/routes";
import { SwiperSlide } from "swiper/react";

interface CategoriesProps {
	className?: string;
	type?: "rounded" | "circle";
    data?: any;
    isLoading?: boolean;
}

const breakpoints = {
	"1820": {
		slidesPerView: 7,
		spaceBetween: 28,
	},
	"1400": {
		slidesPerView: 6,
		spaceBetween: 28,
	},
	"1125": {
		slidesPerView: 5,
		spaceBetween: 20,
	},
	"920": {
		slidesPerView: 4,
		spaceBetween: 20,
	},
	"500": {
		slidesPerView: 3,
		spaceBetween: 12,
	},
	"0": {
		slidesPerView: 2,
		spaceBetween: 12,
	},
};

const breakpointsCircle = {
	"1820": {
		slidesPerView: 7,
		spaceBetween: 48,
	},
	"1400": {
		slidesPerView: 6,
		spaceBetween: 32,
	},
	"1125": {
		slidesPerView: 5,
		spaceBetween: 28,
	},
	"920": {
		slidesPerView: 4,
		spaceBetween: 20,
	},
	"500": {
		slidesPerView: 3,
		spaceBetween: 20,
	},
	"0": {
		slidesPerView: 2,
		spaceBetween: 12,
	},
};

const CategoryItemSwiperView: React.FC<CategoriesProps> = ({
	className = "mb-10 md:mb-11 lg:mb-12 xl:mb-14 lg:pb-1 xl:pb-0",
	type = "circle",
    isLoading,
    data,
}) => {

	return (
		<div className={className}>
            <Carousel
                breakpoints={type === "rounded" ? breakpoints : breakpointsCircle}
                buttonGroupClassName="-mt-4 md:-mt-5 xl:-mt-7"
                autoplay={{
                    delay: 3000,
                }}
            >
                {isLoading && !data
                    ? Array.from({ length: 10 }).map((_, idx) => {
                            if (type === "rounded") {
                                return (
                                    <SwiperSlide key={`card-rounded-${idx}`}>
                                        <CardRoundedLoader uniqueKey={`card-rounded-${idx}`} />
                                    </SwiperSlide>
                                );
                            }
                            return (
                                <SwiperSlide key={`card-circle-${idx}`}>
                                    <CardLoader uniqueKey={`card-circle-${idx}`} />
                                </SwiperSlide>
                            );
                        })
                    : data?.content?.map((product:any) => (
                            <SwiperSlide key={`category--key-${product.id}`}>
                                <Card
                                    item={product}
                                    href={`${ROUTES.CATEGORY}/${product.id}?name=${product.nameEng}&image=${product.image?.id}`}
                                    variant={type}
                                    effectActive={true}
                                    size={type === "rounded" ? "medium" : "small"}
                                />
                            </SwiperSlide>
                        ))}
            </Carousel>
		</div>
	);
};

export default CategoryItemSwiperView;
