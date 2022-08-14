import {useTranslation} from "next-i18next";
import {useEffect, useState} from "react";
import {
    DELIVERY,
    LOCALSTORAGE_CATEGORY,
    LOCALSTORAGE_PAY_TYPE, PAY_TYPE_CASH, PAY_TYPE_KNET, PAY_TYPE_MASTERCARD
} from "../../../constantas/consts";
import cash from "./images/money.png"
import MasterCardIcon from "@components/icons/mastercard";
import CashIcon from "@components/icons/cash";
import Button from "@components/ui/button";
import {useRouter} from "next/router";
import {useCart} from "@contexts/cart/cart.context";
// import {AiFillFastBackward, AiFillFastForward} from "react-icons/all";

export const CheckoutThank: React.FC<{ nextComponent: any, prevComponent: any, thank: string }> = ({thank}) => {
    const [translated, setTranslated] = useState<any>(false)
    const router = useRouter()
    const { resetCart } = useCart();
    useEffect(() => {
            setTranslated(true)
            localStorage.removeItem('chawkbazar-cart')

            return ()=>{
                resetCart();
            }

        },
        [])
    const {t} = useTranslation()


    // @ts-ignore
    return (<div className={`transition h-96 flex flex-col items-center justify-between ease-in-out delay-150 ${!translated ? 'translate-x-full' : ""}  duration-300`}>
            <h2 className="text-lg md:text-xl xl:text-2xl text-center font-bold text-heading mb-6 xl:mb-10">
                {t("text-thank")}
            </h2>
            <h2 className="text-lg md:text-xl xl:text-2xl text-center mt-6 text-gray-600 font-bold text-heading mb-6 xl:mb-8">
                {t("text-order-code")}: <span className={`text-green-600`}>{thank}</span>
            </h2>

            <Button onClick={()=>router.replace("/")} className={`w-40`}>Ok </Button>
        </div>
    );
};

