import {useState} from "react";
import type {TUserSearchParams} from "@/shared/types/apiUserServices.t.ts";
import {useGetUsers} from "@/shared/hooks/useUserService.ts";


function Users() {
    const [searchData, setSearchData] = useState<TUserSearchParams>({
        limit: 20,
        page: 1,
        sort: "ASC"
    })
    const {data, isPending, error} = useGetUsers(searchData)

    console.log(data)

    return (
        <div>
            {data?.status && <h1>{data.data.data.total}</h1>}
        </div>
    );
}

export {Users};