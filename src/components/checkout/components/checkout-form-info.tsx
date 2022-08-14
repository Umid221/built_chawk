import {useTranslation} from "next-i18next";
import {useEffect, useState} from "react";
import {
    DELIVERY,
    LOCALSTORAGE_ADDRESS, LOCALSTORAGE_BRANCH, LOCALSTORAGE_CATEGORY,
    LOCALSTORAGE_CONTACT,
    LOCALSTORAGE_DELIVERY,
    LOCALSTORAGE_DELIVERY_APARTMENT,
    LOCALSTORAGE_DELIVERY_HOUSE,
    LOCALSTORAGE_DELIVERY_OFFICE, LOCALSTORAGE_ORDER_TIME_TYPE,
    LOCALSTORAGE_PAY_TYPE, LOCALSTORAGE_TIMING, LOCATION_TYPE_APARTMENT, LOCATION_TYPE_HOME, LOCATION_TYPE_OFFICE,
    PICKUP
} from "../../../constantas/consts";
import Button from "@components/ui/button";
import http from "@framework/utils/http";
import {API_ENDPOINTS} from "@framework/utils/api-endpoints";
import Modal from "@components/common/modal/modal";

export const CheckoutFormInfo: React.FC<{ nextComponent: any, prevComponent: any,setText:any }> = ({ prevComponent,nextComponent,setText }) => {
    const [translated, setTranslated] = useState<any>({})
    const [contact, setContact] = useState<any>({})
    const [country, setCountry] = useState<any>({})
    const [location, setLocation] = useState<any>({})
    const [branch, setBranch] = useState<any>({})
    const [payType, setPayType] = useState<any>("")
    const [locationType, setLocationType] = useState<any>('')
    const [timingItem, setTimingItem] = useState<any>('')
    const [orderTimeType, setOrderTimeType] = useState<any>('')
    const [order, setOrder] = useState<any>('')
    const [category, setCategory] = useState<any>('')
    const [modalMsg, setModalMsg] = useState<any>(false)
    const [loading, setLoading] = useState<any>(false)


    useEffect(() => {
            setTranslated(true)
            let pType = localStorage.getItem((LOCALSTORAGE_PAY_TYPE))
            let con0 = localStorage.getItem((LOCALSTORAGE_CONTACT))
            let address0 = localStorage.getItem((LOCALSTORAGE_ADDRESS))
            let del = localStorage.getItem((LOCALSTORAGE_DELIVERY))
            let del_h = localStorage.getItem((LOCALSTORAGE_DELIVERY_HOUSE))
            let del_ap = localStorage.getItem((LOCALSTORAGE_DELIVERY_APARTMENT))
            let del_of = localStorage.getItem((LOCALSTORAGE_DELIVERY_OFFICE))
            let orTimeType = localStorage.getItem((LOCALSTORAGE_ORDER_TIME_TYPE))
            let cat = localStorage.getItem((LOCALSTORAGE_CATEGORY))
            let timing = localStorage.getItem((LOCALSTORAGE_TIMING))
            let br = localStorage.getItem(LOCALSTORAGE_BRANCH)
            let or = localStorage.getItem("chawkbazar-cart")
            // @ts-ignore
            let ort = JSON.parse(JSON.parse(or))
            setOrder(ordersWithAttributes(ort))
            setCategory(cat)
            // @ts-ignore
            let con = JSON.parse(con0)
            // @ts-ignore
            let address = JSON.parse(address0)
            setPayType(pType)
            setLocationType(del)
            setContact(con)
            // @ts-ignore
            setTimingItem(JSON.parse(timing))
            // @ts-ignore
            setBranch(JSON.parse(br))
            setOrderTimeType(orTimeType)
            let a = del
            if (a === LOCATION_TYPE_HOME) {
                // @ts-ignore
                setLocation({...JSON.parse(del_h), location: a})
            } else if (a === LOCATION_TYPE_APARTMENT) {
                // @ts-ignore
                setLocation({...JSON.parse(del_ap), location: a})
            } else if (a === LOCATION_TYPE_OFFICE) {
                // @ts-ignore
                setLocation({...JSON.parse(del_of), location: a})
            }
            setCountry(address)


        },
        [])
    const {t} = useTranslation()


    function ordersWithAttributes(order: any) {
        let orders = []
        for (let i = 0; i < order?.items?.length; i++) {
            let attr = order?.items[i]?.attributes?.filter((item:any) => {
                // item.chosenModifiers?.length() > 0
                if (item.chosenModifiers) {
                    // return item.chosenModifiers.length() > 0
                    return item.chosenModifiers.length
                }
            })
            orders.push({...order?.items[i], attributes: attr})
        }
        return ({...order, items: orders})
    }


    function placeOrder() {
    setLoading(true)
        let ord: any = {
            deliveryArea: country?.area?.id,
            orderTimeType: orderTimeType,
            timing: timingItem?.id,
            timingDate: timingItem?.dateString,
            itemsPrice: order?.total,
            products: order?.items,
            // itemsTotalPrice
            payType,
            status: category,
            userData: {
                avenue: location?.avenue,
                block: location?.block,
                building: location?.building,
                email: contact?.email,
                floor: location?.floor,
                house: location?.apartment || location?.houseNumber,
                name: contact?.name,
                payType,
                phone: contact?.phone,
                special: location?.specialDirections,
                street: location?.street,
                unitType: locationType,
            }
// orderType
        }
        postOrder(ord)

    }

    async function postOrder(details: any) {
        const {data} = await http.post(API_ENDPOINTS.POST_ORDER, details);
        setModalMsg(data.message)
        setLoading(false)
        setText(data.message)
        nextComponent(6)


    }

    // console.log(order)

    function closeModal() {
        setModalMsg(false)
    }

    return (<div className={`transition ease-in-out delay-150 ${!translated ? 'translate-x-full' : ""}  duration-300`}>
            <h2 className="text-lg md:text-xl xl:text-2xl pl-4 font-bold text-heading mb-8 xl:mb-8">
                {t("text-shipping-details")}
            </h2>
            <div className={`flex flex-col space-y-4 border-2 border-gray-300 px-3 py-5 relative rounded-3xl `}>
                <span className="text-lg md:text-xl absolute -top-5  xl:text-xl font-bold text-heading bg-white p-1">
                    {t("text-contact-information")}
                </span>
                <div className={"flex space-x-4 px-2"}>
                    <label className={"w-full flex space-x-4 "}>
                        <span
                            className=" text-lg font-bold  text-current  ">{t("forms:label-name")}:</span>
                        <p className={`text-gray-400`}>{contact?.name}</p>
                    </label>

                </div>
                <div className={"flex sm:flex-row flex-col px-2 sm:space-x-4 sm:space-y-0 space-y-4"}>
                    <label className={"w-1/2 flex space-x-4 "}>
                        <span className="text-lg   font-bold  text-current">{t("forms:label-phone")}:</span>
                        <p className={`text-gray-400`}>{contact?.phone}</p>
                    </label>
                    <label className={"w-1/2 flex space-x-4 "}>
                        <span className="text-lg  font-bold text-current ">{t("forms:label-email")}:</span>
                        <p className={`text-gray-400`}>{contact?.email}</p>
                    </label>
                </div>


            </div>
            {category === DELIVERY && <div className={`flex flex-col mt-8 space-y-4 border-2 border-gray-300 px-3 py-5 relative rounded-3xl `}>
                <h2 className="text-lg md:text-xl absolute -top-5  xl:text-xl font-bold text-heading bg-white p-1">
                    {t("text-shipping-details")}
                </h2>
                <div className={"flex space-x-4"}>
                    <label className={"w-full flex space-x-4 ml-1"}>
                        <span
                            className="text-lg font-bold  text-current  ">{t("text-country")}:</span>
                        <p className={`text-gray-400`}>{country?.country?.name}</p>
                    </label>

                </div>
                <div className={"flex sm:flex-row flex-col px-2 sm:space-x-4 sm:space-y-0 space-y-4 "}>
                    <label className={"w-1/2  flex space-x-5 "}>
                        <span className="text-lg font-bold  text-current mr-8">{t("text-city")}:</span>
                        <p className={`text-gray-400`}>{country?.city?.name}</p>
                    </label>
                    <label className={"w-1/2  flex space-x-4 "}>
                        <span className="text-lg font-bold  text-current">{t("text-area")}:</span>
                        <p className={`text-gray-400`}>{country?.area?.name}</p>
                    </label>
                </div>


            </div>
            }
            {category === PICKUP && <div className={`flex flex-col mt-8 space-y-4 border-2 border-gray-300 px-3 py-5 relative rounded-3xl `}>
                <h2 className="text-lg md:text-xl xl:text-xl font-bold text-heading mb-6 mt-2">
                    {t("text-shipping-details")}
                </h2>
                <label className={"w-full flex space-x-4 "}>
                        <span
                            className="text-lg  font-bold text-heading  ">Mode of Delivery:</span>
                    <p>{PICKUP}</p>
                </label>
                <div className={"flex space-x-4 mt-4"}>
                    <label className={"w-1/2 flex space-x-4 "}>
                        <span
                            className="text-lg  font-bold text-heading  ">Branch:</span>
                        <p>{branch?.nameEng}</p>
                    </label>
                    <label className={"w-1/2  flex space-x-4 "}>
                        <span className="text-lg  font-bold text-heading">Address:</span>
                        <p>{branch?.addressEng}</p>
                    </label>
                </div>


            </div>
            }
            {category === DELIVERY && <div className={`flex flex-col mt-8 space-y-4 border-2 border-gray-300 px-3 py-5 relative rounded-3xl `}>
                <h2 className="text-lg md:text-xl absolute -top-5  xl:text-xl font-bold text-heading bg-white p-1">
                    {t("text-shipping-location")}
                </h2>

                <div className={"flex flex-wrap gap-y-4 "}>
                    <label className={"lg:w-1/3 w-1/2  flex space-x-4 "}>
                        <span className="text-lg font-bold  text-current">{t("text-block")}:</span>
                        <p className={`text-gray-400`}>{location?.block}</p>
                    </label>
                    <label className={"lg:w-1/3 w-1/2  flex space-x-4 "}>
                        <span className="text-lg font-bold  text-current">{t("text-street")}:</span>
                        <p className={`text-gray-400`}>{location?.street}</p>
                    </label>
                    <label className={"lg:w-1/3 w-1/2  flex space-x-4 "}>
                        <span className="text-lg font-bold  text-current">{t("text-avenue")}:</span>
                        <p className={`text-gray-400`}>{location?.avenue}</p>
                    </label>
                    {locationType !== LOCATION_TYPE_HOME &&
                        <label className={"lg:w-1/3 w-1/2  flex space-x-4 "}>
                            <span className="text-lg font-bold  text-current">{t("text-building")}:</span>
                            <p className={`text-gray-400`}>{location?.building}</p>
                        </label>

                    }
                    {locationType === LOCATION_TYPE_HOME && <label className={"lg:w-1/3 w-1/2  flex space-x-4 "}>
                        <span className="text-lg font-bold  text-current">House:</span>
                        <p className={`text-gray-400`}>{location?.houseNumber}</p>
                    </label>

                    }
                    {locationType !== LOCATION_TYPE_HOME && < >
                        <label className={"lg:w-1/3 w-1/2 flex space-x-4 "}>
                            <span className="text-lg font-bold  text-current">{t("text-floor")}:</span>
                            <p className={`text-gray-400`}>{location?.floor}</p>
                        </label>
                        <label className={"lg:w-1/3 w-1/2 flex space-x-4 "}>
                            <span className="text-lg font-bold  text-current">{t(`${locationType===LOCATION_TYPE_APARTMENT?"text-apartment":"text-office"}`)}:</span>
                            <p className={`text-gray-400`}>{location?.apartment}</p>
                        </label>
                    </>}
                    <div className={"flex space-x-4 space-y-2"}>

                        <label className={"w-full  flex space-x-4 "}>
                            <span className="text-lg font-bold  text-current">{t("text-special")}:</span>
                            <p className={`font-bold text-black`}>{location?.specialDirections}</p>
                        </label>
                    </div>
                </div>
                <div className={"flex space-x-4 space-x-4"}>





                </div>






            </div>}

            <div>

            </div>
            <div className="relative flex space-x-4  items-center mt-20 ">

                <Button
                    className={`bg-transparent text-gray-900 `}
                    onClick={() => prevComponent(4)}
                    disabled={loading}
                >Prev </Button>
                <Button
                    disabled={loading}
                    onClick={placeOrder}
                >Place Order</Button>
            </div>
            <Modal open={modalMsg} onClose={closeModal}>
                <div className={`w-96 h-40 bg-white  `}>
                    <p className={`bg-black text-white text-center h-10`}>THANK YOU</p>
                    <p className={`text-center text-lg font-bold`}>Order number: <span
                        className={`text-green-500 font-normal`}>{modalMsg}</span></p>
                </div>
            </Modal>
        </div>
    );
};

