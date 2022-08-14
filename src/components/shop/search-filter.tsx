import {useCategoriesQuery} from "@framework/category/get-all-categories";
import {CheckBox} from "@components/ui/checkbox";
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import {useTranslation} from "next-i18next";
import Input from "@components/ui/input";
import Button from "@components/ui/button";
import SearchIcon from "@components/icons/search-icon";
import {LOCALSTORAGE_BRANCH, LOCALSTORAGE_CATEGORY, PICKUP} from "../../constantas/consts";

export const SearchFiter = () => {
    const {t} = useTranslation("common");
    const [searchText, setSearch] = useState("")
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

    const router = useRouter();
    const {pathname, query} = router;
    const {data, isLoading} = useCategoriesQuery({branch});
    const selectedCategories = query?.search
        ? (query.search as string).split(",")
        : [];
    const [formState, setFormState] = React.useState<string[]>(
        selectedCategories
    );

    React.useEffect(() => {
        setFormState(selectedCategories);
    }, [query?.category]);

    if (isLoading) return <p>Loading...</p>;

    function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
        const {value} = e.currentTarget;
        setSearch(value)
        const {search, ...restQuery} = query;
        if(value === "")  {
            delete restQuery?.search
        }
        router.push(
            {
                pathname,
                query: {
                    ...restQuery,
                    ...(value !== ""
                        ? {search: value}
                        : {}),
                },
            },
            undefined,
            {scroll: false}
        );

    }

    const items = data;
    const {locale} = useRouter();


    return (
        <div className="block border-b border-gray-300 pb-7 mb-7">
            <h3 className="text-heading text-sm md:text-base font-semibold mb-7">
                {t("breadcrumb-search")}
            </h3>
            <div className="mt-2 flex  ">

                <Input
                    name={"search"}
                    value={searchText}
                    onChange={handleItemClick}
                    className={`w-full`}
                />


            </div>
        </div>
    );
};
