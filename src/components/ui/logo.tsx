import Image from "next/image";
import Link from "@components/ui/link";
import cn from "classnames";
import { siteSettings } from "@settings/site-settings";
import { useStoreLogoQuery } from "@framework/get-store-logo";

const Logo: React.FC<React.AnchorHTMLAttributes<{}>> = ({
	className,
	...props
}) => {

	const {data, isLoading, error} = useStoreLogoQuery()

	if (isLoading) return <div>Loading...</div>

	const {id, originalName} = data?.data?.attachment

	return (
		<Link
			href={siteSettings.logo.href}
			className={cn("inline-flex focus:outline-none", className)}
			{...props}
		>
			<Image
				src={process.env.NEXT_PUBLIC_GET_ATTACHMENT+id}
				alt={originalName}
				height={siteSettings.logo.height}
				width={siteSettings.logo.width}
				layout="fixed"
				loading="eager"
			/>
		</Link>
	);
};

export default Logo;
