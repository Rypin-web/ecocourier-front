import {createRootRoute, Outlet} from "@tanstack/react-router";
import {TanStackRouterDevtools} from "@tanstack/router-devtools";
import {ThemeProvider} from "@/components/themeProvider.tsx";
import {Header} from "@/widgets/Header.tsx";
import {UserProvider} from "@/shared/providers/userProvider.tsx";

export const Route = createRootRoute({
    component: () =>
        <ThemeProvider>
            <UserProvider>
                <Header/>
                <main>
                    <Outlet />
                </main>
            </UserProvider>
            <TanStackRouterDevtools />
        </ThemeProvider>

})