import { Contact } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";

export const fetchContacts = async () => {
	const { data: { data } } = await http.get(`${API_ENDPOINTS.CONTACT}`);
	return data;
};
export const useContactsQuery = () => {
	return useQuery<Contact, Error>([API_ENDPOINTS.CONTACT], () =>
		fetchContacts()
	);
};