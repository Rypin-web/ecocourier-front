import {useState} from "react";
import {AdminNavigation} from "@/widgets/AdminNavigation/AdminNavigation.tsx";

function Admin() {
    const [activeModel, setActiveModel] = useState('');

    console.log(activeModel)

    return (
        <>
            <AdminNavigation setActiveModel={setActiveModel} />
            <div className={'pl-[250px]'}>
                Admin
            </div>
        </>
    );
}

export {Admin};