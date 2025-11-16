import {createContext, useContext, useState} from "react";
import * as React from "react";

type User = {
    id: string
    first_name: string
    last_name: string
    phone: string
    email: string
    role:string
    createdAt: string
    updatedAt: string
}
type Basket = {
    id:string
    userId: string
    productId: string
    quantity: number
    createdAt: string
    updatedAt: string
}
type TUserContext = {
    user:User | null,
    basket: Basket[] | null
    setUser: (data: User | null ) => void
    setBasket: (data: Basket[] ) => void
} | null

const userContext = createContext<TUserContext>(null)

export function UserProvider({children}: {children: React.ReactNode}) {
    const [user, setUser] = useState<User | null>(null)
    const [basket, setBasket] = useState<Basket[]>([])

    return (
        <userContext.Provider value={{user, basket, setUser, setBasket}}>
            {children}
        </userContext.Provider>
    )
}

export function useUserContext () {
    return useContext(userContext)
}