import {TanStackRouterDevtools} from "@tanstack/router-devtools";
import {ThemeProvider} from "@/components/themeProvider.tsx";
import {Header} from "@/widgets/Header.tsx";
import {useUserContext} from "@/shared/providers/userProvider.tsx";
import {Toaster} from "@/components/ui/sonner.tsx";
import {Outlet} from "@tanstack/react-router";
import {useEffect} from "react";
import {useGetMe} from "@/hooks/useUserService.ts";

export function Root() {
    const userContext = useUserContext()
    const {data} = useGetMe()

    useEffect(() => {
        if (data?.data.msg) {
            userContext.setUser(data.data.user)
        }
    }, [data])

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