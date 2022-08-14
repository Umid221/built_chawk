import { Product } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";

export const fetchCategoryProducts:any = async ({queryKey}:any) => {
	const [_key, _params] = queryKey;
	console.log(_params.id)
	const { data : {data} } = await http.get(API_ENDPOINTS.CATEGORY_PRODUCTS+_params.id,{params:_params.branch});
	return data;
};
export const useCategoryProductsQuery = ( options: any ) => {
	return useQuery<Product[], Error>(
		[API_ENDPOINTS.CATEGORY_PRODUCTS, options],
		fetchCategoryProducts
	);
};