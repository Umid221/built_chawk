import Button from "@components/ui/button";
import Input from "@components/ui/input";
import TextArea from "@components/ui/text-area";
import {useTranslation} from "next-i18next";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import HouseIcon from "@components/icons/house";
import {OfficeBuildingIcon} from "@heroicons/react/solid";
import OfficeIcon from "@components/icons/office";
import {
    LOCALSTORAGE_DELIVERY, LOCALSTORAGE_DELIVERY_APARTMENT, LOCALSTORAGE_DELIVERY_HOUSE, LOCALSTORAGE_DELIVERY_OFFICE,
    LOCATION_TYPE_APARTMENT,
    LOCATION_TYPE_HOME,
    LOCATION_TYPE_OFFICE
} from "../../../constantas/consts";

export const CheckoutAddressInfo: React.FC<{ prevComponent: any, nextComponent: any }> = ({
                                                                                              prevComponent,
                                                                                              nextComponent
                                                                                          }) => {

    interface CheckoutInputType {
        block: string;
        street: string;
        avenue: string;
        building: string;
        floor: string;
        apartment: string;
        specialDirections: string;
        houseNumber: string;

    }
    const initialState={
        block: "",
        street: "",
        avenue: "",
        building: "",
        floor: "",
        apartment: "",
        specialDirections: "",
        houseNumber: "",
    }

    const [locationType, setLocationType] = useState<any>(LOCATION_TYPE_HOME)
    const [translated, setTranslated] = useState<any>(false)
    const [house, setHouse] = useState<any>(null)
    const [office  , setOffice] = useState<any>(null)
    const [apartment, setApartment] = useState<any>(null)

    const {t} = useTranslation()
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<CheckoutInputType>();

    function onSubmit(input: CheckoutInputType) {
        localStorage.setItem(LOCALSTORAGE_DELIVERY, locationType)
        if (locationType === LOCATION_TYPE_HOME) {
            setHouse(input)
            localStorage.setItem(LOCALSTORAGE_DELIVERY_HOUSE, JSON.stringify(input))
        } else if (locationType === LOCATION_TYPE_APARTMENT) {
            setApartment(input)
            localStorage.setItem(LOCALSTORAGE_DELIVERY_APARTMENT, JSON.stringify(input))
        } else if (locationType === LOCATION_TYPE_OFFICE) {
            setOffice(input)
            localStorage.setItem(LOCALSTORAGE_DELIVERY_OFFICE, JSON.stringify(input))
        }
        nextComponent(4)
    }

    function handleLocation(type: string) {
        setLocationType(type)
        if(type===LOCATION_TYPE_HOME){
            reset(house||initialState)
        }else if(type===LOCATION_TYPE_APARTMENT){
            reset(apartment||initialState)
        }else if(type===LOCATION_TYPE_OFFICE){
            reset(office||initialState)
        }

    }

    useEffect(() => {
        setTranslated(true)
        let location = localStorage.getItem(LOCALSTORAGE_DELIVERY)
        let office1 = localStorage.getItem(LOCALSTORAGE_DELIVERY_OFFICE)
        let apartment1 = localStorage.getItem(LOCALSTORAGE_DELIVERY_APARTMENT)
        let house1 = localStorage.getItem(LOCALSTORAGE_DELIVERY_HOUSE)
        // @ts-ignore
        setOffice(JSON.parse(office1)); setApartment(JSON.parse(apartment1)); setHouse(JSON.parse(house1))
        if (location) {
            setLocationType(location)

            if (location === LOCATION_TYPE_HOME && house1) {
                reset(JSON.parse(house1))
            } else if (location === LOCATION_TYPE_OFFICE && office1) {
                reset(JSON.parse(office1))
            } else if (location === LOCATION_TYPE_APARTMENT && apartment1) {
                reset(JSON.parse(apartment1))
            }
        }
    }, [])
    return (<div className={`transition ease-in-out delay-150 ${!translated ? 'translate-x-full' : ""}  duration-300`}>
            <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
                {t("text-delivery-information")}
            </h2>
            <div className="flex items-start space-x-3 mb-4">
                <label
                    className={`bg-gray-200 rounded-xl w-32 cursor-pointer  h-16 text-center flex flex-col items-center justify-center pb-1  ${locationType === LOCATION_TYPE_HOME ? "bg-black text-white" : ""}`}
                    htmlFor="house">
                    <span>{t("text-house")}</span>
                    <HouseIcon/>

                    <input onChange={() => handleLocation(LOCATION_TYPE_HOME)} className="hidden" type="radio"
                           name="address" id={"house"}/>
                </label>
                <label
                    className={`bg-gray-200 rounded-xl w-32 h-16  text-center cursor-pointer flex flex-col items-center justify-center pb-1 ${locationType === LOCATION_TYPE_OFFICE ? "bg-black text-white" : ""}`}
                    htmlFor="office">
                    <span>{t("text-office")}</span> <OfficeIcon/>
                    <input onChange={() => handleLocation(LOCATION_TYPE_OFFICE)} className="hidden" type="radio"
                           name="address" id={"office"}/>
                </label>
                <label
                    className={`bg-gray-200 rounded-xl w-32 h-16 cursor-pointer text-center flex flex-col items-center justify-center pb-1 ${locationType === LOCATION_TYPE_APARTMENT ? "bg-black text-white" : ""}`}
                    htmlFor="apartment">
                    <span>{t("text-apartment")}</span> <OfficeBuildingIcon width={40} height={40}/>
                    <input onChange={() => handleLocation(LOCATION_TYPE_APARTMENT)} className="hidden" type="radio"
                           name="address" id={"apartment"}/>
                </label>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full mx-auto flex flex-col justify-center "
                noValidate
            >
                <div className="flex flex-col space-y-4 lg:space-y-5">
                    <div className="flex lg:space-x-5">

                        <Input
                            labelKey="text-block"
                            {...register("block", {
                                required: "forms:block-required",
                            })}
                            errorKey={errors.block?.message}
                            variant="solid"
                            className="w-full lg:w-1/2 "
                        />
                        <Input
                            labelKey="text-street"
                            {...register("street",{
                                required: "forms:street-required",
                            })}
                            errorKey={errors.street?.message}
                            variant="solid"
                            className="w-full lg:w-1/2 "
                        />
                    </div>
                    <div className="flex lg:space-x-5">


                        <Input
                            labelKey="text-avenue"
                            {...register("avenue")}
                            variant="solid"
                            className="w-full lg:w-1/2 "
                        />
                        {locationType === LOCATION_TYPE_HOME && <Input
                            labelKey="text-house-num"
                            {...register("houseNumber",{
                                required: "forms:house-required",
                            })}
                            errorKey={errors.houseNumber?.message}
                            variant="solid"
                            className="w-full lg:w-1/2 "
                        />
                        }

                        {locationType !== LOCATION_TYPE_HOME && <Input
                            labelKey="text-building"
                            {...register("building",{
                                required: "forms:building-required",
                            })}
                            errorKey={errors.building?.message}
                            variant="solid"
                            className="w-full lg:w-1/2 "
                        />}
                    </div>
                    {locationType !== LOCATION_TYPE_HOME && <div className="flex lg:space-x-5">

                        <Input
                            labelKey="text-floor"
                            {...register("floor",{
                                required: "forms:floor-required",
                            })}
                            errorKey={errors.floor?.message}
                            variant="solid"
                            className="w-full lg:w-1/2 "
                        />
                        <Input
                            labelKey={`${locationType===LOCATION_TYPE_APARTMENT?"text-apartment":"text-office"}`}
                            {...register("apartment",{
                                required: "forms:apartment-required",
                            })}
                            errorKey={errors.apartment?.message}
                            variant="solid"
                            className="w-full lg:w-1/2 "
                        />
                    </div>}


                    <TextArea
                        labelKey="text-special"
                        {...register("specialDirections")}
                        className="relative pt-3 xl:pt-6"
                    />

                    <div className="relative flex justify-between items-center ">
                        <Button
                            className={`bg-transparent text-gray-900 `}
                            onClick={(e) => {
                                e.preventDefault();
                                prevComponent(2)
                            }}
                        > {t("text-prev")}</Button>


                        <Button
                            className={`bg-transparent text-gray-900 `}
                            >{t("text-next")}</Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

