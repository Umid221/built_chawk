import { Attachment } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useQuery } from "react-query";

export const fetchPromotionBanners = async ({ queryKey }: any) => {
	const [_key, _params] = queryKey;
	const { data } = await http.get(API_ENDPOINTS.PROMOTION_BANNERS);
	return data.data;
};
export const usePromotionBannersQuery = () => {
	return useQuery<[ promotionBanners :Attachment[]], Error>(
		[API_ENDPOINTS.PROMOTION_BANNERS],
		fetchPromotionBanners
	);
};