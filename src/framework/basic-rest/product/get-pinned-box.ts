// import { PinnedBox } from "@framework/types";
import http from "@framework/utils/http";
import {API_ENDPOINTS} from "@framework/utils/api-endpoints";
import {useQuery} from "react-query";

export const fetchPinnedBox = async ({ queryKey }: any) => {
	const [_key, _params] = queryKey;
	const { data : {data} } = await http.get(API_ENDPOINTS.PINNED_BOX);
	let pinned=data
	return pinned;
};
export const usePinnedBoxQuery = () => {
	return useQuery<any, Error>(
		[API_ENDPOINTS.PINNED_BOX],
		fetchPinnedBox
	);
};