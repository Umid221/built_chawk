import React, {useState} from 'react';
import Scrollbar from "@components/common/scrollbar";
import Button from "@components/ui/button";
import cn from "classnames";
import {Drawer} from "@components/common/drawer/drawer";
import {useTranslation} from "next-i18next";
import http from "@framework/utils/http";
import {API_ENDPOINTS} from "@framework/utils/api-endpoints";
import {useRouter} from "next/router";

function OrderStatus({open,close}:any) {
    const {t} = useTranslation();
    const router=useRouter();
    const [orderCode,setOrderCode]=useState("")
    const [phone,setPhone]=useState("")
    const [status,setStatus]=useState(null)
    const [loading,setLoading]=useState(false)
    console.log(open)

    function onSubmit() {
        if(orderCode!==""&&phone!==""&&!loading){
            setLoading(true)
            getStatus()
        }

    }

    async function getStatus(){
        const {data} = await http.get(API_ENDPOINTS.ORDER_STATUS+`?code=${orderCode}&phone=${phone}`);
        console.log(data?.data)
        router.push(`/order-status?orderId=${data?.data?.id}`)
        setStatus(data?.data)
        setOrderCode("")
        setPhone("")
        setLoading(false)

    }
    return (
        <Drawer
            open={open}
            placement={"left"}
            onClose={close}
            handler={false}
            showMask={true}
            level={null}
            contentWrapperStyle={{left: 0}}
        >


            <div className="flex flex-col w-full h-full justify-between">
                <div
                    className="w-full pr-4 mt-4  relative ps-5 md:ps-7 py-0.5 border-b border-gray-100">
                    <h2 className="font-bold text-xl md:text-2xl m-0 text-heading">
                        {t("text-look-for-order")}
                    </h2>

                    <input
                        id="code"
                        name="code"
                        onChange={(e)=>setOrderCode(e.target.value)}
                        value={orderCode}
                        placeholder={t("text-order-code")}
                        autoComplete="country-name"
                        className="mt-3 mb-3 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <input
                        id="phone"
                        name="phone"
                        onChange={(e)=>setPhone(e.target.value)}
                        value={phone}
                        placeholder={t("text-phone-number")}
                        autoComplete="country-name"
                        className="mt-3 mb-3 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <Scrollbar className="cart-scrollbar w-full flex-grow px-2 pl-6">

                </Scrollbar>
                <div
                    className="flex flex-col px-5 md:px-7 pt-2 pb-5 md:pb-7"
                    onClick={onSubmit}
                >
                    <Button
                        className={cn(
                            "w-full px-5 py-3 md:py-4 flex items-center justify-center bg-heading rounded-md text-sm sm:text-base text-white focus:outline-none transition duration-300 hover:bg-gray-600",
                        )}
                    >
					<span className="w-full pe-5 -mt-0.5 py-0.5">
						{t("text-look")}
					</span>
                        <span className="ms-auto flex-shrink-0 -mt-0.5 py-0.5">
						<span className="border-s border-white pe-5 py-0.5"/>

					</span>
                    </Button>
                </div>
            </div>

        </Drawer>
    );
}

export default OrderStatus;