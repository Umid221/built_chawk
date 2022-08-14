import React, { useState } from "react";
import cn from "classnames";
import { motion, AnimatePresence } from "framer-motion";
import { heightCollapse } from "@utils/motion/height-collapse";
import { useTranslation } from "next-i18next";

type CollapseProps = {
	i: number;
	titleKey?: string;
	title?: any;
	content?: any;
	contentKey?: any;
	expanded: number;
	translatorNS: string;
	setExpanded: any;
	variant?: "gray" | "transparent";
	inCart?: boolean;
};

export const Collapse: React.FC<CollapseProps> = ({
	i,
	expanded,
	setExpanded,
	titleKey,
	title,
	content,
	contentKey,
	translatorNS,
	variant = "gray",
	inCart
}) => {
	const isOpen = i === expanded;

	const { t } = useTranslation(translatorNS);
	return (
		<div
			className={cn({
				"rounded-md bg-gray-200": variant === "gray",
				"shadow-sm": isOpen,
			})}
		>
			<motion.header
				initial={false}
				onClick={() => setExpanded(isOpen ? false : i)}
				className={cn(
					`cursor-pointer flex items-center justify-between transition-colors ${inCart?"py-1 md:py-1":"py-5 md:py-6"}`,
					{
						"px-6 md:px-8 lg:px-10": variant === "gray",
						" border-gray-300": variant === "transparent",
					}
				)}
			>
				<h2
					className={cn(
						"text-sm font-semibold leading-relaxed text-heading pe-2",
						{
							"md:text-base": variant === "gray",
							"md:text-base lg:text-lg": variant === "transparent",
						}
					)}
				>
					{titleKey ? t(titleKey) : title}
				</h2>
				<div className="flex-shrink-0 relative w-4 h-4 flex justify-center items-center">
					<div className="w-full h-0.5 bg-heading rounded-sm" />
					<div
						className={`origin-bottom transform w-0.5 h-full bg-heading rounded-sm absolute bottom-0 transition-transform duration-500 ease-in-out ${
							isOpen ? "scale-0" : "scale-100"
						}`}
					/>
				</div>
			</motion.header>
			<AnimatePresence initial={false}>
				{isOpen && (
					<motion.div
						key="content"
						initial="from"
						animate="to"
						exit="from"
						variants={heightCollapse()}
					>
						<div
							className={cn(`${inCart?"py-1 md:py-1":"py-5 md:py-6"} leading-7 text-sm text-gray-600`, {
								"pt-5 border-t border-gray-300 px-6 md:px-8 lg:px-10":
									variant === "gray",
							})}
						>
							{contentKey ? t(contentKey) : content}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

type AccordionProps = {
	translatorNS: string;
	items: {
		titleKey?: string;
		title?: string;
		contentKey?: string;
		content?: string;
	}[];
	variant?: "gray" | "transparent";
};

const Accordion: React.FC<AccordionProps> = ({
	items,
	translatorNS,
	variant = "gray",
}) => {
	const [expanded, setExpanded] = useState<number>(0);

	return (
		<>
			{items?.map((item, index) => (
				<Collapse
					i={index}
					key={item.titleKey}
					titleKey={item.titleKey}
					contentKey={item.contentKey}
					expanded={expanded}
					setExpanded={setExpanded}
					variant={variant}
					translatorNS={translatorNS}
				/>
			))}
		</>
	);
};

export default Accordion;
