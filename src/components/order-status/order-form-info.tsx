import {useTranslation} from "next-i18next";
import {useEffect, useState} from "react";

import Button from "@components/ui/button";
import Modal from "@components/common/modal/modal";
import {DELIVERY, LOCATION_TYPE_APARTMENT, LOCATION_TYPE_HOME, PICKUP} from "../../constantas/consts";

export const OrderFormInfo: React.FC<{ order:any }> = ({order}) => {
    const [translated, setTranslated] = useState<any>({})
    const [contact, setContact] = useState<any>({})
    const [country, setCountry] = useState<any>({})
    const [location, setLocation] = useState<any>({})
    const [branch, setBranch] = useState<any>({})
    const [payType, setPayType] = useState<any>("")
    const [locationType, setLocationType] = useState<any>('')
    const [timingItem, setTimingItem] = useState<any>('')
    const [orderTimeType, setOrderTimeType] = useState<any>('')
    // const [order, setOrder] = useState<any>('')
    const [category, setCategory] = useState<any>('')
    const [modalMsg, setModalMsg] = useState<any>(false)
    const [loading, setLoading] = useState<any>(false)



    const {t} = useTranslation()

    console.log(order)


    function closeModal() {
        setModalMsg(false)
    }

    return (
        <div className={`transition ease-in-out delay-150 ${!translated ? 'translate-x-full' : ""}  duration-300`}>
            <h2 className="text-lg md:text-xl xl:text-2xl pl-4 font-bold text-heading mb-8 xl:mb-8">
                {t("text-order")}: <span className={`text-green-500`}>{order?.orderId}</span>
            </h2>
            <div className={`flex flex-col space-y-4 border-2 border-gray-300 px-3 py-5 relative rounded-3xl `}>
                <span className="text-lg md:text-xl absolute -top-5  xl:text-xl font-bold text-heading bg-white p-1">
                    {t("text-contact-information")}
                </span>
                <div className={"flex space-x-4 px-2"}>
                    <label className={"w-full flex space-x-4 "}>
                        <span
                            className=" text-lg font-bold  text-current  ">{t("forms:label-name")}:</span>
                        <p className={`text-gray-400`}>{order?.userData?.name}</p>
                    </label>

                </div>
                <div className={"flex sm:flex-row flex-col px-2 sm:space-x-4 sm:space-y-0 space-y-4"}>
                    <label className={"w-1/2 flex space-x-4 "}>
                        <span className="text-lg   font-bold  text-current">{t("forms:label-phone")}:</span>
                        <p className={`text-gray-400`}>{order?.userData?.phone}</p>
                    </label>
                    <label className={"w-1/2 flex space-x-4 "}>
                        <span className="text-lg  font-bold text-current ">{t("forms:label-email")}:</span>
                        <p className={`text-gray-400`}>{order?.userData?.email}</p>
                    </label>
                </div>


            </div>
            {<div className={`flex flex-col mt-8 space-y-4 border-2 border-gray-300 px-3 py-5 relative rounded-3xl `}>
                <h2 className="text-lg md:text-xl absolute -top-5  xl:text-xl font-bold text-heading bg-white p-1">
                    {t("text-shipping-details")}
                </h2>
                <div className={"flex space-x-4"}>
                    <label className={"w-full flex space-x-4 ml-1"}>
                        <span
                            className="text-lg font-bold  text-current  ">{t("text-country")}:</span>
                        <p className={`text-gray-400`}>{order?.deliveryArea?.city?.country?.nameEng}</p>
                    </label>

                </div>
                <div className={"flex sm:flex-row flex-col px-2 sm:space-x-4 sm:space-y-0 space-y-4 "}>
                    <label className={"w-1/2  flex space-x-5 "}>
                        <span className="text-lg font-bold  text-current mr-8">{t("text-city")}:</span>
                        <p className={`text-gray-400`}>{order?.deliveryArea?.city?.nameEng}</p>
                    </label>
                    <label className={"w-1/2  flex space-x-4 "}>
                        <span className="text-lg font-bold  text-current">{t("text-area")}:</span>
                        <p className={`text-gray-400`}>{order?.deliveryArea?.city?.nameEng}</p>
                    </label>
                </div>


            </div>
            }
            {order?.orderType === PICKUP && <div className={`flex flex-col mt-8 space-y-4 border-2 border-gray-300 px-3 py-5 relative rounded-3xl `}>
                <h2 className="text-lg md:text-xl xl:text-xl font-bold text-heading mb-6 mt-2">
                    {t("text-shipping-details")}
                </h2>
                <label className={"w-full flex space-x-4 "}>
                        <span
                            className="text-lg  font-bold text-heading  ">{t("text-mode-delivery")}:</span>
                    <p>{PICKUP}</p>
                </label>
                <div className={"flex space-x-4 mt-4"}>
                    <label className={"w-1/2 flex space-x-4 "}>
                        <span
                            className="text-lg  font-bold text-heading  ">{t("text-branch")}:</span>
                        <p>{branch?.nameEng}</p>
                    </label>
                    <label className={"w-1/2  flex space-x-4 "}>
                        <span className="text-lg  font-bold text-heading">{t("text-address")}:</span>
                        <p>{branch?.addressEng}</p>
                    </label>
                </div>


            </div>
            }
            {order?.orderType === DELIVERY && <div className={`flex flex-col mt-8 space-y-4 border-2 border-gray-300 px-3 py-5 relative rounded-3xl `}>
                <h2 className="text-lg md:text-xl absolute -top-5  xl:text-xl font-bold text-heading bg-white p-1">
                    {t("text-shipping-location")}
                </h2>

                <div className={"flex flex-wrap gap-y-4 "}>
                    <label className={"lg:w-1/3 w-1/2  flex space-x-4 "}>
                        <span className="text-lg font-bold  text-current">{t("text-block")}:</span>
                        <p className={`text-gray-400`}>{order?.userData?.block}</p>
                    </label>
                    <label className={"lg:w-1/3 w-1/2  flex space-x-4 "}>
                        <span className="text-lg font-bold  text-current">{t("text-street")}:</span>
                        <p className={`text-gray-400`}>{order?.userData?.street}</p>
                    </label>
                    <label className={"lg:w-1/3 w-1/2  flex space-x-4 "}>
                        <span className="text-lg font-bold  text-current">{t("text-avenue")}:</span>
                        <p className={`text-gray-400`}>{order?.userData?.avenue}</p>
                    </label>
                    {order?.userData?.unitType !== LOCATION_TYPE_HOME &&
                        <label className={"lg:w-1/3 w-1/2  flex space-x-4 "}>
                            <span className="text-lg font-bold  text-current">{t("text-building")}:</span>
                            <p className={`text-gray-400`}>{order?.userData?.building}</p>
                        </label>

                    }
                    {order?.userData?.unitType === LOCATION_TYPE_HOME && <label className={"lg:w-1/3 w-1/2  flex space-x-4 "}>
                        <span className="text-lg font-bold  text-current">{t("text-house-num")}:</span>
                        <p className={`text-gray-400`}>{order?.userData?.house}</p>
                    </label>

                    }
                    {order?.userData?.unitType !== LOCATION_TYPE_HOME && < >
                        <label className={"lg:w-1/3 w-1/2 flex space-x-4 "}>
                            <span className="text-lg font-bold  text-current">{t("text-floor")}:</span>
                            <p className={`text-gray-400`}>{order?.userData?.floor}</p>
                        </label>
                        <label className={"lg:w-1/3 w-1/2 flex space-x-4 "}>
                            <span className="text-lg font-bold  text-current">{t(`${locationType === LOCATION_TYPE_APARTMENT ? "text-apartment" : "text-office"}`)}:</span>
                            <p className={`text-gray-400`}>{order?.userData?.house}</p>
                        </label>
                    </>}
                    <div className={"flex space-x-4 space-y-2"}>

                        <label className={"w-full  flex space-x-4 "}>
                            <span className="text-lg font-bold  text-current">{t("text-special")}:</span>
                            <p className={`font-bold text-black`}>{order?.userData?.special}</p>
                        </label>
                    </div>
                </div>
                <div className={"flex space-x-4 space-x-4"}>





                </div>






            </div>}

            <div>

            </div>

        </div>
    );
};

