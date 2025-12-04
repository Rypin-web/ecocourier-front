import {createFileRoute} from "@tanstack/react-router";
import {Admin} from "@/pages/Admin.tsx";
import {RequireRole} from "@/shared/utils/requireRole.tsx";


export const Route = createFileRoute("/admin")({
    component: () => <RequireRole roles={['admin']}><Admin /></RequireRole>
})