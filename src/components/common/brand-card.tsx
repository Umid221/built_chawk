import cn from "classnames";
import Link from "next/link";
import Image from "next/image";
import {ROUTES} from "@utils/routes";
import {useTranslation} from "next-i18next";
import {useRouter} from "next/router";


const BrandCard: React.FC<{ brand: any }> = ({ brand }) => {
	// const variant = "grid"
	const { slug, nameEng, nameAr, image } = brand;
	const { t } = useTranslation("common");
	const {locale} = useRouter()

	return (
		<Link
			href={{
				pathname: ROUTES.SEARCH,
				query: { brand: slug },
			}}
		>
			<div className="group justify-center  relative overflow-hidden rounded-md">
				<Image
					src={process.env.NEXT_PUBLIC_GET_ATTACHMENT+image?.id || "/assets/placeholder/brand-bg.svg"}
					alt={locale==='en'?nameEng:nameAr || t("text-brand-thumbnail")}
					width={428}
					height={428}
					className="rounded-md object-cover transform transition-transform ease-in-out duration-500 group-hover:rotate-6 group-hover:scale-125"
				/>
				{/* <div className="flex absolute top left bg-black w-full h-full opacity-50 transition-opacity duration-500 group-hover:opacity-80" /> */}
				{/* <div className="absolute top left h-full w-full flex items-center justify-center p-8">
					<img
						src={process.env.NEXT_PUBLIC_GET_ATTACHMENT+image?.id}
						alt={name || t("text-brand-thumbnail")}
						className="flex-shrink-0"
					/>
					<div className="flex-shrink-0">{locale==='en'?nameEng:nameAr}</div>
				</div> */}
				<div
					className={cn("w-full overflow-hidden", "md:px-2.5 xl:px-4")}
				>
					<h2 className={cn("text-heading font-semibold truncate mb-1 mt-2","text-sm md:text-base")}>
						{ locale==='en' ? nameEng : nameAr }
					</h2>
				</div>
			</div>
		</Link>
	);
};

export default BrandCard;
