import {useUserContext} from "@/shared/providers/userProvider.tsx";
import {NotFound} from "@/pages/NotFound.tsx";
import type {ReactNode} from "react";

interface RequireRoleProps {
    children: ReactNode,
    roles?: ('user' | 'courier' | 'admin')[]
}

function RequireRole({children, roles = ['user']}: RequireRoleProps) {
    const {user} = useUserContext()

    if (!!user?.role && roles?.includes(user?.role)) return children

    return <NotFound />;
}

export {RequireRole};