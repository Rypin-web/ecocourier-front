import {AdminNavigation} from "@/widgets/AdminNavigation/AdminNavigation.tsx";
import {Outlet} from "@tanstack/react-router";

//setActiveModel={setActiveModel}

function Admin() {
    // const [activeModel, setActiveModel] = useState('');

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