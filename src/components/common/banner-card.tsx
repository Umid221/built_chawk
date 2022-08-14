import Link from "@components/ui/link";
import Image from "next/image";
import type { FC } from "react";
import { useWindowSize } from "@utils/use-window-size";
import cn from "classnames";
import { LinkProps } from "next/link";
import Button from "@components/ui/button";
import { useRouter } from "next/router";

interface BannerProps {
	banner: any;
	variant?: "rounded" | "default";
	effectActive?: boolean;
	className?: string;
	classNameInner?: string;
	href: LinkProps["href"];
}

// function getImage(deviceWidth: number, imgObj: any) {
// 	// return deviceWidth < 480 ? imgObj.mobile : imgObj.desktop;
// 	return deviceWidth < 480 ? imgObj: imgObj;
// }

const BannerCard: FC<BannerProps> = ({
	banner,
	className,
	variant = "rounded",
	effectActive = false,
	classNameInner,
	href,
}) => {
	const {locale} = useRouter()
	const { width } = useWindowSize();
	// const { originalName, id } = banner;
	
	return (
		<div className={cn("mx-auto", className)}>
			<Link
				href={href}
				className={cn(
					"h-full group flex justify-center relative overflow-hidden",
					classNameInner
				)}
			>
				<Image
					src={process.env.NEXT_PUBLIC_GET_ATTACHMENT+banner?.id}
					width={width}
					height={ width < 480 ? 170 : 570}
					alt={banner?.originalName}
					quality={100}
					className={cn("bg-gray-300 object-cover w-full", {
						"rounded-md": variant === "rounded",
					})}
				/>
				{effectActive && (
					<div className="absolute top-0 -start-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine" />
				)}
				{/* <Button className="absolute bottom-1/4 left-1/4">{locale==='en'?'Go to collection':'اذهب إلى المجموعة'}</Button> */}
			</Link>
		</div>
	);
};

export default BannerCard;
