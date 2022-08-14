import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import {
    DELIVERY,
    LOCALSTORAGE_CATEGORY,
    LOCALSTORAGE_PAY_TYPE, PAY_TYPE_CASH, PAY_TYPE_KNET, PAY_TYPE_MASTERCARD
} from "../../../constantas/consts";
import cash from "./images/money.png"
import MasterCardIcon from "@components/icons/mastercard";
import CashIcon from "@components/icons/cash";
import Button from "@components/ui/button";
// import {AiFillFastBackward, AiFillFastForward} from "react-icons/all";

export const CheckoutPayType: React.FC<{ nextComponent: any,prevComponent: any }> = ({ nextComponent,prevComponent }) => {
    const [translated,setTranslated]=useState<any>(false)
    const [category,setCategory]=useState<any>("")
    const [locationType,setLocationType]=useState<any>(PAY_TYPE_CASH)

    useEffect(() => {
            setTranslated(true)
            let s = localStorage.getItem(LOCALSTORAGE_CATEGORY);
            setCategory(s)
        },
		[])
    const {t}=useTranslation()


    function handlePayType(type: string) {
        localStorage.setItem(LOCALSTORAGE_PAY_TYPE,type)
        setLocationType(type)
        console.log(type)
        if(type===PAY_TYPE_CASH){

        }else  if(type===PAY_TYPE_KNET){

        }else  if(type===PAY_TYPE_MASTERCARD){

        }
    }

    function nextStep() {
        localStorage.setItem(LOCALSTORAGE_PAY_TYPE,locationType)
        nextComponent(5)
    }

    // @ts-ignore
    return (<div className={`transition ease-in-out delay-150 ${!translated?'translate-x-full':""}  duration-300`}>
            <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
				{t("text-payment-method")}
			</h2>
            <div className="w-full mx-auto flex flex-col sm:flex-row justify-center space-x-2 items-center ">
                <label
                    className={`bg-gray-200 rounded-xl w-32 h-16 text-center flex flex-col items-center justify-center pb-1  ${locationType === PAY_TYPE_CASH ? "bg-black text-white" : ""}`}
                    htmlFor="cash">
                    <span>{t("text-cash")}</span>
                    <CashIcon color={locationType === PAY_TYPE_CASH ? "white" : "green"}/>
                    <input onChange={() => handlePayType(PAY_TYPE_CASH)} className="hidden" type="radio" name="payType" id={"cash"}/>
                </label>
                <label
                    className={`bg-gray-200 rounded-xl w-32 h-16 text-center flex flex-col items-center justify-center pb-1 ${locationType === PAY_TYPE_KNET ? "bg-black text-white" : ""}`}
                    htmlFor="knet">
                    <span>{t("text-knet")}</span>
                    <img src={cash} alt="knet"/>
                    <input onChange={() => handlePayType(PAY_TYPE_KNET)} className="hidden" type="radio" name="payType" id={"knet"}/>
                </label>
                <label
                    className={`bg-gray-200 rounded-xl w-32 h-16 text-center flex flex-col items-center justify-center pb-1 ${locationType === PAY_TYPE_MASTERCARD ? "bg-black text-white" : ""}`}
                    htmlFor="mastercard">
                    <span>{t("text-card")}</span>
                    <MasterCardIcon/>

                    <input onChange={() => handlePayType(PAY_TYPE_MASTERCARD)} className="hidden" type="radio"
                           name="payType" id={"mastercard"}/>
                </label>
            </div>
            <div className="relative flex justify-between  items-center mt-20 ">
                <Button
                    className={`bg-transparent text-gray-900 `}
                    onClick={(e) => {
                        e.preventDefault();
                        prevComponent(category===DELIVERY?3:2)
                    }}
                >{t("text-prev")}</Button>
                <Button
                    className={`bg-transparent text-gray-900 `}
                    onClick={()=>{nextStep()}}
                >{t("text-next")} </Button>
            </div>
	</div>
	);
};

