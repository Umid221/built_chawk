import { StoreLogo } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useQuery } from "react-query";

export const fetchStoreLogo = async ({ queryKey }: any) => {
	const [_key, _params] = queryKey;
	const { data } = await http.get(API_ENDPOINTS.STORE_LOGO);
	return data;
};
export const useStoreLogoQuery = () => {
	return useQuery<StoreLogo, Error>(
		[API_ENDPOINTS.STORE_LOGO],
		fetchStoreLogo
	);
};