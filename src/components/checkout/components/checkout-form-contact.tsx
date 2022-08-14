import Button from "@components/ui/button";
import Input from "@components/ui/input";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {LOCALSTORAGE_CONTACT} from "../../../constantas/consts";

export const CheckoutContact: React.FC<{ nextComponent: any }> = ({ nextComponent }) => {
	const [translated,setTranslated]=useState(false)
    interface CheckoutInputType {
        name: string;
        phone: string;
        email: string;
    }
    useEffect(() => {
			setTranslated(true)
			let a = localStorage.getItem(LOCALSTORAGE_CONTACT)
			if(a){
				reset(JSON.parse(a))
			}
		},
		[])
    const {t}=useTranslation()
    const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<CheckoutInputType>();
	function onSubmit(input: CheckoutInputType) {
		// updateUser(input);
		console.log(input)
		localStorage.setItem(LOCALSTORAGE_CONTACT,JSON.stringify(input))
		nextComponent(2)
	}
	
	return (<div className={`transition ease-in-out delay-150 ${!translated?'translate-x-full':""}  duration-300`}>
            <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
				{t("text-contact-information")}
			</h2>
		<form
				onSubmit={handleSubmit(onSubmit)}
				className="w-full mx-auto flex flex-col justify-center "
				noValidate

			>
				<div className="flex flex-col space-y-4 lg:space-y-5">
					<div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
						<Input
							labelKey="forms:label-name"
							{...register("name", {
								required: "forms:first-name-required",
							})}
							errorKey={errors.name?.message}
							variant="solid"
							className="w-full "
						/>
					</div>
					<div className="flex flex-col  space-y-4 ">
						<Input
							type="tel"
							labelKey="forms:label-phone"
							{...register("phone", {
								required: "forms:phone-required",
							})}
							errorKey={errors.phone?.message}
							variant="solid"
							className="w-full mb-2 "
						/>

						<Input
							type="email"
							labelKey="forms:label-email-star"
							{...register("email", {
								required: "forms:email-required",
								pattern: {
									value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
									message: "forms:email-error",
								},
							})}
							errorKey={errors.email?.message}
							variant="solid"
							className="w-full  mt-3 "
						/>
					</div>
                    <div className="relative flex items-center justify-end ">
                    <Button
                    //  onClick={(e)=>{e.preventDefault()}}
						className={`bg-transparent text-gray-900 float-r`}
					>{t("text-next")}</Button>
                    </div>
					</div>
			</form></div>
	);
};

