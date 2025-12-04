import * as React from "react";
import {createContext, useContext, useState} from "react";

type User = {
    id: string
    first_name: string
    last_name: string
    phone: string
    email: string
    role: 'user' | 'courier' | 'admin'
    createdAt: string
    updatedAt: string
}
type Basket = {
    id: string
    userId: string
    productId: string
    quantity: number
    createdAt: string
    updatedAt: string
}
type TUserContext = {
    user: User | null
    basket: Basket[] | null
    setUser: (data: User | null) => void
    setBasket: (data: Basket[]) => void
    isOpen: boolean
    toggleOpen: () => void
}

const userContext = createContext<TUserContext>({
    user: null,
    basket: null,
    isOpen: false,
    toggleOpen: () => {
    },
    setUser: () => {
    },
    setBasket: () => {
    }
})

//Провайдеры же раньше загружаются чем, компоненты и
//мне впадлу придумывать чет еще, пускай тут будет
//Если будет много таких констант, то вынесу, хз, может в другой провайдер или просто в объект,
//на что вайб будет
export const apiUrl = import.meta.env.VITE_API_URL + '/uploads/'

export function UserProvider({children}: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [basket, setBasket] = useState<Basket[]>([])
    const [isOpen, setOpen] = useState(false)
    const toggleOpen = () => setOpen(!isOpen)

    return (
        <userContext.Provider value={{user, basket, setUser, setBasket, isOpen, toggleOpen}}>
            {children}
        </userContext.Provider>
    )
}

export function useUserContext() {
    return useContext(userContext)
}