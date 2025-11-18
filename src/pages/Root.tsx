import {TanStackRouterDevtools} from "@tanstack/router-devtools";
import {ThemeProvider} from "@/components/themeProvider.tsx";
import {Header} from "@/widgets/Header.tsx";
import {useUserContext} from "@/shared/providers/userProvider.tsx";
import {Toaster} from "@/components/ui/sonner.tsx";
import {Outlet} from "@tanstack/react-router";
import type {TUserGetMeResponseData} from "@/shared/types/apiUserServices.t.ts";
import {useEffect} from "react";

export function Root({user}: { user: TUserGetMeResponseData['user'] | null }) {
    const userContext = useUserContext()
    console.log('@@user data', user)
    useEffect(() => {
        if (user) userContext.setUser(user)
    }, [user])

    return (
        <ThemeProvider>
            <Toaster position={"bottom-left"} />
            <Header />
            <main>
                <Outlet />
            </main>
            <TanStackRouterDevtools />
        </ThemeProvider>
    )
}