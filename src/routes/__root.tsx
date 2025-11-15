import {createRootRoute, Outlet} from "@tanstack/react-router";
import {TanStackRouterDevtools} from "@tanstack/router-devtools";
import {ThemeProvider} from "@/components/themeProvider.tsx";
import {Header} from "@/widgets/Header.tsx";

export const Route = createRootRoute({
    component: () =>
        <ThemeProvider>
            <Header/>
            <main>
                <Outlet />
            </main>
            <TanStackRouterDevtools />
        </ThemeProvider>

})