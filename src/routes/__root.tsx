import {createRootRoute} from "@tanstack/react-router";
import {Root} from "@/pages/Root.tsx";


export const Route = createRootRoute({
    component: () => {
        return <Root />
    },
})