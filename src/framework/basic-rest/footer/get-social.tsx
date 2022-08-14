import { Social } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";

export const fetchSocial = async () => {
	const { data: { data } } = await http.get(`${API_ENDPOINTS.SOCIAL}`);
	return data;
};
export const useSocialQuery = () => {
	return useQuery<Social, Error>([API_ENDPOINTS.SOCIAL], () =>
		fetchSocial()
	);
};
