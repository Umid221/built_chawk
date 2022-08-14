import Container from "@components/ui/container";
import CategoryBlock from "@containers/category-block";
import Layout from "@components/layout/layout";
import Divider from "@components/ui/divider";
import BannerSliderBlock from "@containers/banner-slider-block";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {GetStaticProps} from "next";
import HeroSlider from "@containers/hero-slider";
import {useCategoriesQuery} from "@framework/category/get-all-categories";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {LOCALSTORAGE_BRANCH, LOCALSTORAGE_CATEGORY, PICKUP} from "../constantas/consts";
import ProductsFlashSaleCarousel from "@containers/product-flash-sale-carousel";
import http from "@framework/utils/http";
import {API_ENDPOINTS} from "@framework/utils/api-endpoints";
import ProductsTopBlock from "@containers/products-top-block";
import ProductsPromoCarousel from "@containers/product-promo-sale-carousel";

export default function Home() {

	const {locale} = useRouter()
	const [branch, setBranch] = useState<any>({})
	const [pinned, setPinned] = useState<any>([])
	const [view,setView]=useState(null)
	useEffect(() => {
		getView()
		getPinned()
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

	async function getView() {
		const {data} = await http.get(API_ENDPOINTS.GET_STORE_VIEW);
		console.log(data)
		setView(data.data)
	}

	async function getPinned() {
		const {data} = await http.get(API_ENDPOINTS.PINNED_BOX);
		console.log(data)
		setPinned(data.data)
	}



	const { data } = useCategoriesQuery({branch});
	console.log(pinned)

	console.log(pinned)
	return (
		<>
			{/* <BannerBlock data={masonryBanner} /> */}
			<HeroSlider variantRounded="default" variant="fullWidth" />
			 <BannerSliderBlock />
			<Container>
				<CategoryBlock sectionHeading="text-shop-by-category" type="rounded" />
				{/*<ProductsFlashSaleBlock date={"2023-03-01T01:02:03"} />*/}
				{/*<BrandGridBlock sectionHeading="text-shop-by-category" />*/}
				{
				view!=="GRID"?
					data?.map((category) => <ProductsFlashSaleCarousel
					key={category.id}
					sectionHeading={locale === 'en' ? category.nameEng : category.nameAr}
					category={category}
					limit={5}
				/>)
				:<ProductsTopBlock sectionHeading="text-categories" />
				}


				{/* {
					data?.map((category) => <ProductsFeatured 
						key={category.id}
						sectionHeading={locale==='en'?category.nameEng:category.nameAr} 
						// category={category}
					/>)
				} */}
				{pinned?.map((category:any) => <ProductsPromoCarousel
					key={category.id}
					sectionHeading={locale === 'en' ? category.titleEng : category.titleAr}
					category={category}
					limit={5}
				/>)}
				{/* <BannerCard
					key={`banner--key${banner[0].id}`}
					banner={banner[0]}
					href={`${ROUTES.COLLECTIONS}/${banner[0].slug}`}
					className="mb-12 lg:mb-14 xl:mb-16 pb-0.5 lg:pb-1 xl:pb-0"
				/> */}
				{/* <BannerCard
					key={`banner--key${banner[1].id}`}
					banner={banner[1]}
					href={`${ROUTES.COLLECTIONS}/${banner[1].slug}`}
					className="mb-12 lg:mb-14 xl:mb-16 pb-0.5 lg:pb-1 xl:pb-0"
				/> */}
				{/* {
					!isLoading && data?.map(item=>{
						return  item?.products?.length>0 && <BannerWithProducts
							error={error}
							data={item}
							sectionHeading="text-on-selling-products"
							categorySlug="/search"
						/>
					})
				} */}
				{/* <ExclusiveBlock /> */}
				{/* <NewArrivalsProductFeed /> */}
				{/* <DownloadApps /> */}
				{/* <Support /> */}
				{/* <Instagram /> */}
				{/* <Subscription className="bg-opacity-0 px-5 sm:px-16 xl:px-0 py-12 md:py-14 xl:py-16" /> */}
			</Container>
			<Divider className="mb-0" />
		</>
	);
}

Home.Layout = Layout;

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
