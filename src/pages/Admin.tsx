import {useState} from "react";
import {AdminNavigation} from "@/widgets/AdminNavigation.tsx";

function Admin() {
    const [activeModel, setActiveModel] = useState('');

    console.log(activeModel)

    return (
        <>
            <AdminNavigation setActiveModel={setActiveModel} />
            <div className={'pl-[220px]'}>
                Admin
            </div>
        </>
    );
}

export {Admin};