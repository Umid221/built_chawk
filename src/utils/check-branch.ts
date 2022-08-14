import {LOCALSTORAGE_BRANCH, LOCALSTORAGE_CATEGORY, PICKUP} from "../constantas/consts";
import {useLocalStorage} from "@utils/use-local-storage";
import {useEffect, useState} from "react";

function CheckBranch() {
    const [branch, setBranch] = useState<any>("")
    useEffect(() => {
        let a = localStorage.getItem(LOCALSTORAGE_BRANCH)
        let category = localStorage.getItem(LOCALSTORAGE_CATEGORY)
        let b = JSON.parse(a)
        if (b && category === PICKUP) {
            setBranch({branchId:b.id})

        } else {
            setBranch({})
        }
    })

    return branch
}

export default CheckBranch;