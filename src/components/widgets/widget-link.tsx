import type { FC } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useContactsQuery } from "@framework/footer/get-contact";
import { useSocialQuery } from "@framework/footer/get-social";
import Image from "next/image";
import { useRouter } from "next/router";

interface Props {
	className?: string;
	data: {
		widgetTitle?: string;
		lists: {
			id: any;
			path?: string;
			title: string;
			icon?: any;
		}[];
	};
	contacts:any;
	social:any;
}

const WidgetLink: FC<Props> = ({ className, data, contacts, social}) => {
	const {locale} = useRouter()
	const { widgetTitle, lists } = data;
	const { t } = useTranslation("footer");

	// const contacts = useContactsQuery()
	// const social = useSocialQuery()

	// console.log(social);
	// console.log(data);

	if (social?.data?.length>0){
		return (
			<div className={`${className}`}>
				<h4 className="text-heading text-sm md:text-base xl:text-lg font-semibold mb-5 2xl:mb-6 3xl:mb-7">
					{t(`${widgetTitle}`)}
				</h4>
				<ul className="text-xs lg:text-sm text-body flex flex-col space-y-3 lg:space-y-3.5">
					{
					!social.isLoading && data.widgetTitle==="widget-title-social" ? social?.data?.map((list:any) => {
						return <li
							key={`widget-list--key${list.id}`}
							className="flex items-center"
						>
							<Image
								src={`/icons/social/${list.icon}.svg`}
								alt={list.icon}
								width={14}
								height={14}
								className="me-3 relative top-0.5 lg:top-1 text-sm lg:text-base"
							/>
							<Link href={list.link ? list.link : "#!"}>
								<a className="transition-colors duration-200 hover:text-black ml-3">
									{/* {t(`${list.title}`)} */}
									{list.name}
								</a>
							</Link>
						</li>
					}) : (!contacts.isLoading && data.widgetTitle==="widget-title-contact") ? lists.map((list) => (
						<li
							key={`widget-list--key${list.id}`}
							className="flex items-baseline"
						>
							<Link href={list.path ? list.path : "#!"}>
								<a className="transition-colors duration-200 hover:text-black">
									{/* {t(`${list.title}`)} */}
									{
										list.id===2? (contacts?.data?.email):
											list.id===3?contacts?.data?.supportEmail:
											list.id===4? (contacts?.data?.supportPhone && (locale==='en'?'Call us:':'اتصل بنا'+contacts?.data?.supportPhone)):
											t(`${list.title}`)
									}
								</a>
							</Link>
						</li>
					)) : 
					lists?.map((list) => (
						<li
							key={`widget-list--key${list.id}`}
							className="flex items-baseline"
						>
							{list.icon && (
								<span className="me-3 relative top-0.5 lg:top-1 text-sm lg:text-base">
									{list.icon}
								</span>
							)}
							<Link href={list.path ? list.path : "#!"}>
								<a className="transition-colors duration-200 hover:text-black">
									{t(`${list.title}`)}
								</a>
							</Link>
						</li>
					))}
				</ul>
			</div>
		);
	}else{
		return null;
	}
};

export default WidgetLink;
