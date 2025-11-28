import {createFileRoute} from "@tanstack/react-router";
import {CheckAdminRole} from "@/pages/Admin.tsx";


export const Route = createFileRoute("/admin")({
    component: () => <CheckAdminRole />
})