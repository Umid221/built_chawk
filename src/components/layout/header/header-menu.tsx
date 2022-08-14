import Link from "@components/ui/link";
// import {FaChevronDown} from "react-icons/fa";
import MegaMenu from "@components/ui/mega-menu";
import classNames from "classnames";
import ListMenu from "@components/ui/list-menu";
import {useTranslation} from "next-i18next";
// import NextLink from "next/link";
import {Drawer} from "@components/common/drawer/drawer";
// import {IoClose} from "react-icons/io5";
import Scrollbar from "@components/common/scrollbar";
import Input from "@components/ui/input";
import s from "@components/checkout/checkout.module.css";
import Button from "@components/ui/button";
import cn from "classnames";
import {useEffect, useState} from "react";
import {
    AS_SOON_AS_POSSIBLE,
    DELIVERY,
    LOCALSTORAGE_ADDRESS, LOCALSTORAGE_BRANCH, LOCALSTORAGE_CATEGORY, LOCALSTORAGE_ORDER_TIME_TYPE,
    LOCALSTORAGE_TIMING,
    PICKUP,
    SCHEDULE_ORDER
} from "../../../constantas/consts";
import http from "@framework/utils/http";
import {API_ENDPOINTS} from "@framework/utils/api-endpoints";
import PrevIcon from "@components/icons/prev-icon";
import {useWindowSize} from "react-use";
import {toast} from "react-toastify";
// import {useWindowEvent} from "@headlessui/react/dist/hooks/use-window-event";
import OrderStatus from "@components/layout/header/order-status";

interface MenuProps {
    data: any;
    className?: string;
}

const HeaderMenu: React.FC<MenuProps> = ({data, className}) => {
    const {t} = useTranslation();
    const [orderSts, setsetOrderSts] = useState<any>(false)
    const [open, setOpen] = useState<any>(false)

    const [countries, setCountries] = useState<any>([])
    const [pickup, setPickup] = useState<any>([])
    const [timing, setTiming] = useState<any>([])
    const [selectedCategory, setSelectedCategory] = useState<any>(DELIVERY)
    // const [loading, setLoading] = useState<any>(false)
    const [search, setSearch] = useState<any>("")
    const [deliveryStep, setDeliveryStep] = useState<any>(1)
    const [pickupStep, setPickupStep] = useState<any>(1)
    const [country, setCountry] = useState<any>(null)
    const [city, setCity] = useState<any>(null)
    const [area, setArea] = useState<any>(null)
    const [areas, setAreas] = useState<any>([])
    // const [translated, setTranslated] = useState<any>(false)
    const [weekArr, setWeekArr] = useState<any>([])
    const [choosen, setChoosen] = useState<any>("")
    const [choosenItem, setChoosenItem] = useState<any>(null)
    const [choosenPickup, setChoosenPickup] = useState<any>(false)
    // const [fail, setFail] = useState<any>(false)
    // const [modalOpen, setModalOpen] = useState<any>(false)
    const [appropriateTime, setAppropriateTime] = useState<any>(null)
    const [orderTimeType, setOrderTimeType] = useState<any>("")
    const {width} = useWindowSize();


    function closeOrderSts() {
        setsetOrderSts(false)
    }

    const weekDays = [
        {name: "Mon", day: 1, fullname: "MONDAY"},
        {name: "Tue", day: 2, fullname: "TUESDAY"},
        {name: "Wed", day: 3, fullname: "WEDNESDAY"},
        {name: "Thur", day: 4, fullname: "THURSDAY"},
        {name: "Fri", day: 5, fullname: "FRIDAY"},
        {name: "Sat", day: 6, fullname: "SATURDAY"},
        {name: "Sun", day: 0, fullname: "SUNDAY"},
    ]
    const monthNames = ["Jan", "Feb", "Mar", "Ap", "May", "June",
        "July", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    useEffect(() => {
        // setTranslated(true)
        getCountries()
        getPickup()
        getTiming()
        let a = localStorage.getItem(LOCALSTORAGE_ADDRESS)
        if (a) {
            // let b = JSON.parse(a)
        }
        makeWeek()

    }, [])


    function onSubmit() {
        if (selectedCategory === DELIVERY && ((!country || !city) && !area)) {
            setOpen(true)
            // setFail(true)
            return
        } else if (
            selectedCategory === DELIVERY && (
                (appropriateTime === SCHEDULE_ORDER && !orderTimeType) ||
                (!appropriateTime && !orderTimeType)
            )
        ) {
            // setFail(true)
            toast("Choose delivery option", {
                progressClassName: "fancy-progress-bar",
                position: width > 768 ? "bottom-right" : "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return
        } else if (
            selectedCategory === PICKUP && !choosenPickup
        ) {
            // setFail(true)
            toast("Choose pickup branch", {
                progressClassName: "fancy-progress-bar",
                position: width > 768 ? "bottom-right" : "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return
        }
        let a: { area: { name: any; id: any }; country: { name: any; id: any }; city: { name: any; id: any } };
        a = {
            country: {name: country?.nameEng, id: country?.id},
            city: {name: city?.nameEng, id: city?.id},
            area: {name: area?.nameEng, id: area?.id},
        };
        localStorage.setItem(LOCALSTORAGE_ADDRESS, JSON.stringify(a))
        localStorage.setItem(LOCALSTORAGE_TIMING, JSON.stringify(appropriateTime))
        localStorage.setItem(LOCALSTORAGE_ORDER_TIME_TYPE, orderTimeType)
        localStorage.setItem(LOCALSTORAGE_CATEGORY, selectedCategory)
        localStorage.setItem(LOCALSTORAGE_BRANCH, JSON.stringify(choosenPickup))
        setOpen(false)
        setSearch("")
        // @ts-ignore
        window.location.reload(false)

    }


    async function getCountries() {
        // setLoading(true)
        const {data} = await http.get(API_ENDPOINTS.COUNTRIES);
        setCountries(data.data)
        // setLoading(false)
    }

    async function getPickup() {
        // setLoading(true)
        const {data} = await http.get(API_ENDPOINTS.PICKUP);
        setPickup(data.data)
        // setLoading(false)
    }

    async function getTiming() {
        const {data} = await http.get(API_ENDPOINTS.STORE_TIMING);
        setTiming(data.data)
    }

    function handleChoosen(item: any, type: any) {
        if (type === "COUNTRY") {
            if (item.id === country?.id) {
                setCountry(null)
            } else {
                setCountry(item)
            }
            setCity(null)
            setArea(null)

        } else if (type === "CITY") {
            if (item.id === city?.id) {
                setCity(null)
            } else {
                setCity(item)
            }
            setArea(null)


        } else if (type === "AREA") {

            setArea(item)
            setDeliveryStep(2)
        }
    }

    function handleCategory(e: any) {
        setCity(null)
        setCountry(null)
        setArea(null)
        setAppropriateTime(null)
        setOrderTimeType(null)
        setDeliveryStep(1)
        setPickupStep(1)
        setSelectedCategory(e.target.value)

    }


    function makeWeek() {
        let date = new Date()
        let date2 = new Date()
        let arr = []
        for (let i = 0; i < 7; i++) {
            date2.setDate(date.getDate() + i)
            let b = date2.toLocaleString()

            let a = weekDays.filter(item => item.day === date2.getDay())[0]
            arr.push({
                day: date2.getDate(),
                weekDay: a?.name,
                monthName: (i == 0 || i == 6) ? monthNames[date2.getMonth()] : "",
                full: a?.fullname,
                dateString: b.replaceAll("/", "-")
            })
        }
        setWeekArr([...arr])
    }


    function changeButton(e: any, item: any) {
        e.preventDefault()
        setAppropriateTime(null)
        setChoosen(e.target.id)
        setChoosenItem(item)
    }


    function handleTiming(item: any) {
        console.log(item)
        setAppropriateTime(item)
    }

    function handlePickup(item: any) {
        setChoosenPickup(item)
        setPickupStep(2)

    }

    function closeCountry() {
        setOpen(false)
        setSelectedCategory(DELIVERY)
        setDeliveryStep(1)
        setPickupStep(1)
        setArea(null)
        setChoosenPickup(false)
        setSearch("")
    }

    function handleSearch(e: any) {
        setSearch((e.target.value))
        if (e.target.value !== "") {
            getArea(e.target.value)
            setCity(null)
            setCountry(null)
            setArea(null)
        }
    }

    async function getArea(search: string) {
        const {data} = await http.get(API_ENDPOINTS.AREA + `?search=${search}&size=15`);
        setAreas(data.data.content)
    }

    return (
        <nav className={classNames(`headerMenu flex w-full relative`, className)}>
            {data?.map((item: any) => (
                <div
                    className={`menuItem group cursor-pointer py-7 ${
                        item.subMenu ? "relative" : ""
                    }`}
                    key={item.id}
                >
                    <Link
                        href={item.path !== "/branches" ? item.path : ""}
                        className="inline-flex items-center text-sm relative xl:text-base text-heading px-3 xl:px-4  py-2 font-normal relative group-hover:text-black"
                    >
                        {item.path === "/branches" ? <div onClick={() => setOpen(true)}
                                                          className={`w-full sticky `}>
                                {t("menu:" + item.label)}</div> :
                            item.id === 4 ? <div onClick={() => setsetOrderSts(true)}
                                                 className={`w-full sticky `}>
                                {t("menu:" + item.label)}</div> : t("menu:" + item.label)}
                        {/*{(item?.columns || item.subMenu) && (*/}
                        {/*	<span className="opacity-30 text-xs mt-1 xl:mt-0.5 w-4 flex justify-end">*/}
                        {/*		<FaChevronDown className="transition duration-300 ease-in-out transform group-hover:-rotate-180" />*/}
                        {/*	</span>*/}
                        {/*)}*/}
                    </Link>


                    {item?.columns && Array.isArray(item.columns) && (
                        <MegaMenu columns={item.columns}/>
                    )}

                    {item?.subMenu && Array.isArray(item.subMenu) && (
                        <div
                            className="subMenu shadow-header bg-gray-200 absolute start-0 opacity-0 group-hover:opacity-100">
                            <ul className="text-body text-sm py-5">
                                {item.subMenu.map((menu: any, index: number) => {
                                    const dept: number = 1;
                                    const menuName: string = `sidebar-menu-${dept}-${index}`;

                                    return (
                                        <ListMenu
                                            dept={dept}
                                            data={menu}
                                            hasSubMenu={menu.subMenu}
                                            menuName={menuName}
                                            key={menuName}
                                            menuIndex={index}
                                        />
                                    );
                                })}
                            </ul>
                        </div>
                    )}
                </div>
            ))}

            <Drawer
                open={open}
                placement={"left"}
                onClose={closeCountry}
                handler={false}
                showMask={true}
                level={null}
                contentWrapperStyle={{left: 0}}
            >


                <div className="flex flex-col w-full h-full justify-between">
                    {((selectedCategory === DELIVERY && deliveryStep !== 2) || (selectedCategory === PICKUP && pickupStep !== 2)) &&
                        <div
                            className="w-full pr-4 mt-4  relative ps-5 md:ps-7 py-0.5 border-b border-gray-100">
                            <h2 className="font-bold text-xl md:text-2xl m-0 text-heading">
                                {t("text-delivery-area")}

                            </h2>
                            <select
                                id="country"
                                name="country"
                                defaultValue={DELIVERY}
                                onChange={handleCategory}
                                value={selectedCategory}
                                // autoComplete="country-name"
                                className="mt-3 mb-3 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option value={DELIVERY}>Delivery</option>
                                <option value={PICKUP}>Pickup</option>
                            </select>
                        </div>}
                    {(selectedCategory === DELIVERY && deliveryStep === 2) && <div
                        className="w-full flex items-center space-x-4 pr-4 mt-4  relative ps-5 md:ps-7 py-0.5 border-b border-gray-100">
                        <span onClick={() => setDeliveryStep(1)}> <PrevIcon className={`cursor-pointer`}/></span>
                        <h2 className="font-bold text-xl md:text-2xl m-0 text-heading">
                            {t("text-choose-time")}

                        </h2>

                    </div>}
                    {(selectedCategory === PICKUP && pickupStep === 2) && <div
                        className="w-full flex items-center space-x-4 pr-4 mt-4  relative ps-5 md:ps-7 py-0.5 border-b border-gray-100">
                        <span onClick={() => setPickupStep(1)}> <PrevIcon className={`cursor-pointer`}/></span>
                        <h2 className="font-bold text-xl md:text-2xl m-0 text-heading">
                            {t("text-check-out")}

                        </h2>

                    </div>}
                    <Scrollbar className="cart-scrollbar w-full flex-grow px-2 pl-6">
                        {selectedCategory === DELIVERY ? <>{deliveryStep === 1 ? <>
                                    <div className={`my-4`}>
                                        <Input
                                            name={"search"}
                                            variant="solid"
                                            value={search}
                                            placeholder={`${t("forms:placeholder-search")}`}
                                            onChange={handleSearch}
                                        />
                                    </div>
                                    {search === "" ? <div
                                            className={` justify-evenly  sm:items-start max-h-96 overflow-auto ${s.countries_wrapper}`}>
                                            {countries.map((item: any) => <div key={item.id} className="p-0 m-0">
                                                <p onClick={() => handleChoosen(item, "COUNTRY")}
                                                   className="p-2 m-0 border-b-2 flex justify-between font-bold">{item.nameAr}
                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                         className={`h-6 w-6 ${country && (country.id === item.id) ? '' : s.countryArrowSvg} ${s.transition}`}
                                                         fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                                         strokeWidth="2">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              d="M19 9l-7 7-7-7"/>
                                                    </svg>
                                                </p>

                                                {item.cities?.map((item2: any) => <div
                                                    key={item2.id}
                                                    className={`p-0 m-0 ${country && (country.id === item.id) ? '' : s.hidden}  ${s.transition}`}>
                                                    <p onClick={() => handleChoosen(item2, "CITY")}
                                                       className="p-2 m-0 border-b-2 flex justify-between font-normal">{item2.nameEng}
                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                             className={`h-6 w-6 ${city && (city.id === item2.id) ? '' : s.countryArrowSvg}  ${s.transition}`}
                                                             fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                                             strokeWidth="2">
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                  d="M19 9l-7 7-7-7"/>
                                                        </svg>
                                                    </p>

                                                    <div
                                                        className={`p-0 m-0 ${city && (city.id === item2.id) ? "" : s.hidden}  ${s.transition}`}>
                                                        {item2.areas?.map((item3: any) => <p
                                                            key={item3.id}
                                                            onClick={() => handleChoosen(item3, "AREA")}
                                                            className={`p-2 m-0 border-b-2 font-light hover:bg-gray-300 ${area && (area.id === item3.id) ? 'bg-gray-300' : ""}`}>{item3.nameEng}</p>)}
                                                    </div>
                                                </div>)}
                                            </div>)}

                                        </div>
                                        : <div className={`flex flex-col space-y-4 `}>
                                            {
                                                areas.map((item:any) => <div className="form-check border-b-2 pb-2">
                                                        <input
                                                            onChange={() => {
                                                                handleChoosen(item, "AREA")
                                                            }}
                                                            className="form-check-input appearance-none rounded-full h-6 w-6 border border-gray-300 bg-white checked:border-4 checked:bg-white checked:border-black focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-right mr-2 cursor-pointer"
                                                            type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                                                        <label className="form-check-label inline-block text-gray-800 "
                                                               htmlFor="flexRadioDefault1">
                                                            {item.nameEng}
                                                        </label>
                                                    </div>
                                                )
                                            }

                                        </div>} </>
                                : <div className={"flex flex-col space-y-5 mt-4"}>
                                    <div className="form-check">
                                        <div>
                                            <input
                                                onChange={() => setOrderTimeType(AS_SOON_AS_POSSIBLE)}
                                                className="form-check-input h-6 w-6 appearance-none rounded-full  border border-gray-300 bg-white checked:border-4 checked:bg-white checked:border-black focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                                type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                                            <label className="form-check-label inline-block  text-xl text-gray-800"
                                            >
                                                As soon as possible
                                            </label>
                                        </div>

                                    </div>
                                    <div className="form-check">
                                        <div className={`pb-2 border-b-2 border-slate-500`}>
                                            <input
                                                onChange={() => setOrderTimeType(SCHEDULE_ORDER)}
                                                className="form-check-input appearance-none rounded-full h-6 w-6 border border-gray-300 bg-white checked:border-4 checked:bg-white checked:border-black focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                                type="radio" name="flexRadioDefault" id="flexRadioDefault2"/>
                                            <label className="form-check-label  text-xl inline-block text-gray-800"
                                            >
                                                Scedule order
                                            </label>
                                        </div>

                                        {orderTimeType === SCHEDULE_ORDER && <>
                                            <div className={`mt-2`}>

                                                <div className={"flex space-x-3 flex-start"}>
                                                    {
                                                        weekArr.map((item: any) => <div
                                                            key={item.id}
                                                            className={`flex cursor-pointer hover:bg-gray-200 transition ease-in-out duration-300 delay-50 flex-col w-16 overflow-hidden relative rounded-2xl ${choosen === "btn" + item.day ? "bg-heading   hover:bg-black text-white" : ""}  border items-center justify-start focus:bg-white`}>
                                                            <div onClick={(e) => changeButton(e, item)}
                                                                 id={`btn${item.day}`}
                                                                 className={"absolute w-16 opacity-0  h-full bg-black"}></div>
                                                            <span className={`text-2xl font-bold`}>{item?.day}</span>
                                                            <span className={`text-sm font-thin`}>{item.weekDay}</span>
                                                            <span className={`text-xs font-normal`}>{item.monthName}</span>
                                                        </div>)
                                                    }
                                                </div>
                                                <div className={"flex  flex-col mt-2"}>
                                                    {choosenItem && timing?.filter((item: any) => item.day === "EVERYDAY" || item.day === choosenItem.full).map((item: any) =>
                                                        <div
                                                            key={item.id}
                                                            onClick={() => handleTiming({
                                                                ...item,
                                                                dayNum: choosenItem.day,
                                                                dateString: choosenItem.dateString
                                                            })}
                                                            className={"h-16 cursor-pointer transition ease-in-out duration-300 delay-50 hover:shadow-lg hover:bg-gray-200 border-y border-slate-400 flex justify-between p-3 items-center"}>{item.openingTime + " - " + item.closingTime}
                                                            <div
                                                                className={`rounded-full border border-gray-500 h-6 w-6 ${(item.id === appropriateTime?.id && choosenItem?.day === appropriateTime?.dayNum) ? "border-heading border-4" : ""}`}></div>
                                                        </div>)}
                                                </div>
                                            </div>
                                        </>}
                                    </div>
                                </div>}
                            </>
                            : <> {pickupStep === 1 ? <div className={`mt-4`}>
                                    {pickup?.map((item: any) => <div key={item.id} onClick={() => handlePickup(item)}
                                                                     className={`transition ease-in-out cursor-pointer flex justify-between items-center hover:-translate-y-1 px-2 hover:bg-gray-500 duration-300  h-16 font-bold text-black text-2xl border-b-2`}>
                                        <div>{item.nameEng}
                                            <p className={`font-thin text-base text-zinc-600`}>{item.addressEng}</p></div>
                                        <span
                                            className={`rounded-full w-5 h-5 border-4 ${choosenPickup?.id === item.id ? "border-black" : "border-gray-500"}`}></span>
                                    </div>)}

                                </div> :
                                <div className={"w-96 h-96"}>
                                    <div className={"bg-white w-full h-full p-2"}>
                                        <h2 className={`border-b-2 border-gray-500 pb-2 font-bold text-center`}>{choosenPickup.nameEng}</h2>
                                        <h2 className={`border-b-2 border-gray-500 p-2 flex justify-between`}>Working
                                            time <span
                                                className={`text-green-700 font-semibold`}>open:</span></h2>
                                        {choosenPickup ? choosenPickup.pickupTiming?.map((item: any) => <h2
                                            className={`border-b-2 border-gray-500 p-2 font-semibold flex justify-between text-black`}>
                                            <span>{item.day}</span><span>{item.openingTime + " - " + item.closingTime}</span>
                                        </h2>) : ""}
                                    </div>

                                </div>}
                            </>}
                    </Scrollbar>
                    {((selectedCategory === DELIVERY && deliveryStep === 2) || (selectedCategory === PICKUP && pickupStep === 2)) &&
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
						{t("text-choose-area")}
					</span>
                                <span className="ms-auto flex-shrink-0 -mt-0.5 py-0.5">
						<span className="border-s border-white pe-5 py-0.5"/>

					</span>
                            </Button>
                        </div>}
                </div>

            </Drawer>


            <OrderStatus close={closeOrderSts} open={orderSts}/>
        </nav>
    );
};

export default HeaderMenu;
