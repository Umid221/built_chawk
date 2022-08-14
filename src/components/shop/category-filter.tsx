import { useCategoriesQuery } from "@framework/category/get-all-categories";
import { CheckBox } from "@components/ui/checkbox";
import { useRouter } from "next/router";
import React, {useEffect, useState} from "react";
import { useTranslation } from "next-i18next";
import {LOCALSTORAGE_BRANCH, LOCALSTORAGE_CATEGORY, PICKUP} from "../../constantas/consts";

export const CategoryFilter = () => {
	const { t } = useTranslation("common");
	const router = useRouter();
	const [branch, setBranch] = useState<any>({})
	useEffect(() => {
		let a = localStorage.getItem(LOCALSTORAGE_BRANCH)
		let category = localStorage.getItem(LOCALSTORAGE_CATEGORY)
		let b = JSON.parse(a)
		if (b && category === PICKUP) {
			setBranch({branchId:b.id})

		} else {
			setBranch({})
		}
	},[])

	const { pathname, query } = router;
	const { data, isLoading } = useCategoriesQuery({branch});
	const selectedCategories = query?.category
		? (query.category as string).split(",")
		: [];
	const [formState, setFormState] = React.useState<string[]>(
		selectedCategories
	);

	React.useEffect(() => {
		setFormState(selectedCategories);
	}, [query?.category]);

	if (isLoading) return <p>Loading...</p>;

	function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
		const { value } = e.currentTarget;
		let currentFormState = formState.includes(value)
			? formState.filter((i) => i !== value)
			: [...formState, value];
		const { category, ...restQuery } = query;
		router.push(
			{
				pathname,
				query: {
					...restQuery,
					...(!!currentFormState.length
						? { category: currentFormState.join(",") }
						: {}),
				},
			},
			undefined,
			{ scroll: false }
		);
	}
	const items = data;
	const {locale} = useRouter();
	return (
		<div className="block border-b border-gray-300 pb-7 mb-7">
			<h3 className="text-heading text-sm md:text-base font-semibold mb-7">
				{t("text-category")}
			</h3>
			<div className="mt-2 flex flex-col space-y-4">
				{data?.map((item: any) => (
					<CheckBox
						key={item.id}
						label={locale==='en'?item.nameEng:item.nameAr}
						name={locale==='en'?item.nameEng.toLowerCase():item.nameAr.toLowerCase()}
						checked={formState.includes(item.id)}
						value={item.id}
						onChange={handleItemClick}
					/>
				))}
			</div>
		</div>
	);
};
