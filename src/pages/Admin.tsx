import {AdminNavigation} from "@/widgets/AdminNavigation/AdminNavigation.tsx";
import {Outlet} from "@tanstack/react-router";

function Admin() {

    return (
        <>
            <AdminNavigation />
            <div className={'pl-[250px]'}>
                <Outlet />
            </div>
        </>
    );
}

export {Admin};