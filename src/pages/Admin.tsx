import {useUserContext} from "@/shared/providers/userProvider.tsx";
import {NotFound} from "@/pages/NotFound.tsx";

function CheckAdminRole() {
    const {user} = useUserContext()
    if (user?.role !== 'admin') return <NotFound />

    return <Admin />
}

function Admin() {


    return (
        <div>
            Admin
        </div>
    );
}

export {CheckAdminRole};