import { QueryOptionsType } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";

export const fetchPromotionProducts = async ({ queryKey }: any) => {
	const [_key, _params] = queryKey;
	const { data : {data} } = await http.get(API_ENDPOINTS.FLASH_SALE_PRODUCTS+'&today='+_params);
	return data;
};
export const usePromotionProductsQuery = (options: any) => {
	return useQuery<any, Error>(
		[API_ENDPOINTS.FLASH_SALE_PRODUCTS, options],
		fetchPromotionProducts
	);
};
