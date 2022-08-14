import Input from "@components/ui/input";
import { useForm } from "react-hook-form";
import TextArea from "@components/ui/text-area";
import { useCheckoutMutation } from "@framework/checkout/use-checkout";
import { CheckBox } from "@components/ui/checkbox";
import Button from "@components/ui/button";
import Router, { useRouter } from "next/router";
import { ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { ExclamationIcon } from '@heroicons/react/outline'
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import s from "./checkout.module.css"
interface CheckoutInputType {
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
	address: string;
	city: string;
	zipCode: string;
	save: boolean;
	note: string;
	area: string;
}

const OrderForm: React.FC = () => {
	const [open, setOpen] = useState(true)
	const [countries, setCountries] = useState([])
	const [cities, setCities] = useState([])
	const [areas, setAreas] = useState([])
	const [country, setCountry] = useState(null)
	const [city, setCity] = useState(null)
	const [area, setArea] = useState(null)
	const {locale}=useRouter()

	const cancelButtonRef = useRef(null)
	const { t } = useTranslation();
	const { mutate: updateUser, isLoading } = useCheckoutMutation();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CheckoutInputType>();
	function onSubmit(input: CheckoutInputType) {
		updateUser(input);
		Router.push(ROUTES.ORDER);
	}

	async function  getCountries(){
		const { data } = await http.get(API_ENDPOINTS.COUNTRIES);
		setCountries(data.data)
	}

	useEffect(()=>{
		getCountries()
	},[])

function handleChoosen(item,type){
	if(type==="COUNTRY"){
		if(item.id===country?.id){
		setCountry(null)
		}else{
		setCountry(item)
		}
		setCity(null)
		setArea(null)

	}else if(type==="CITY"){
		if(item.id===city?.id){
			setCity(null)
			}else{
			setCity(item)
			}
			setArea(null)


	}else if(type==="AREA"){

			setArea(item)
			setOpen(false)
	}
}

	return (
		<>
			<h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
				{t("text-shipping-address")}
			</h2>
			<div>
				asdads
			</div>

			
		</>
	);
};

export default OrderForm;
