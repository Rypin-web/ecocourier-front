import {createRootRoute} from "@tanstack/react-router";
import {Root} from "@/pages/Root.tsx";
import {NotFound} from "@/pages/NotFound.tsx";


export const Route = createRootRoute({
    component: () => {
        return <Root />
    },
    notFoundComponent: () => <NotFound/>
})