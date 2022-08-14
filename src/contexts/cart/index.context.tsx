import { createContext, ReactNode, useContext, useState } from "react";

type authContextType = {
    items: number;
    changeItemsCount: (num:number) => void;
};

const authContextDefaultValues: authContextType = {
    items: 0,
    changeItemsCount: () => void{},
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export function useItemsCount() {
    return useContext(AuthContext);
}

type Props = {
    children: ReactNode;
};

export function AuthProvider({ children }: Props) {
    const [items, setItems] = useState<number>(0);

    const changeItemsCount = (num:number) => {
        console.log('login');
        setItems(items=>items + num);
    };

    const value = {
        items,
        changeItemsCount,
    };

    return (
        <>
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        </>
    );
}