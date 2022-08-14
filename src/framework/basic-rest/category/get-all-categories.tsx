import {Category} from "@framework/types";
import {API_ENDPOINTS} from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import {useQuery} from "react-query";

export const fetchCategories = async ({queryKey}: any) => {
    const [_key, _params] = queryKey;
    const {
        data: {data},
    } = await http.get(API_ENDPOINTS.CATEGORIES, {params: _params.branch});
    return data
    // return { categories: { data: data as CategoryBase } };
};

// options: CategoriesQueryOptionsType

export const useCategoriesQuery = (options: any) => {
    return useQuery<[categories: Category], Error>(
        [API_ENDPOINTS.CATEGORIES, options],
        fetchCategories
    );
};
