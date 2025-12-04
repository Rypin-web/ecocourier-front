import {useState} from "react";
import {AdminNavigation} from "@/widgets/AdminNavigation/AdminNavigation.tsx";

function Admin() {
    const [activeModel, setActiveModel] = useState('');

    return (
        <>
            <AdminNavigation setActiveModel={setActiveModel} />
            <div className={'pl-[250px]'}>
                {activeModel}
            </div>
        </>
    );
}

export {Admin};