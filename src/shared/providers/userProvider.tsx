import * as React from "react";
import {createContext, useContext, useState} from "react";
import type {Basket, User} from "../types/entities.t";


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