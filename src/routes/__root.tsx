import {createRootRoute, Outlet} from "@tanstack/react-router";
import {TanStackRouterDevtools} from "@tanstack/router-devtools";
import {ThemeProvider} from "@/components/themeProvider.tsx";
import {Header} from "@/widgets/Header.tsx";
import {UserProvider} from "@/shared/providers/userProvider.tsx";
import {Toaster} from "@/components/ui/sonner.tsx";

export const Route = createRootRoute({
    component: () =>
        <ThemeProvider>
            <UserProvider>
                <Header/>
                <main>
                    <Outlet />
                </main>
                <Toaster position={"top-center"} />
            </UserProvider>
            <TanStackRouterDevtools />
        </ThemeProvider>

})