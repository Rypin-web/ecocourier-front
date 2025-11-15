import {createRootRoute, Link, Outlet} from "@tanstack/react-router";
import {TanStackRouterDevtools} from "@tanstack/router-devtools";
import {ThemeProvider} from "@/components/themeProvider.tsx";

export const Route = createRootRoute({
    component: () =>
        <ThemeProvider>
            <Link to={'/'}>Home</Link>
            <Link to={'/about'}>About</Link>
            root
            <Outlet />
            <TanStackRouterDevtools />
        </ThemeProvider>

})