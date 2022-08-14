import {Product} from "@framework/types";
import http from "@framework/utils/http";
import {API_ENDPOINTS} from "@framework/utils/api-endpoints";
import {useQuery} from "react-query";

export const fetchSearchedProducts = async ({queryKey}: any) => {
    const [_key, _params] = queryKey;
    console.log(_params)
    const {data} = await http.get(API_ENDPOINTS.SEARCH + "&" + _params.path, {params: _params.branch});
    return data;
};
export const useSearchQuery = (options: any) => {
    return useQuery<Product[], Error>(
        [API_ENDPOINTS.SEARCH, options],
        fetchSearchedProducts
    );
};
