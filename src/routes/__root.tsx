import {createRootRoute} from "@tanstack/react-router";
import {Root} from "@/pages/Root.tsx";
import {userServiceGetMe} from "@/entity/userService.ts";
import type {TUserGetMeResponseData} from "@/shared/types/apiUserServices.t.ts";


export const Route = createRootRoute({
    loader: async () => {
        try {
            const data = await userServiceGetMe.queryFn<TUserGetMeResponseData>()
            if (data.status < 300) {
                console.log('@@Succes request')
                return {userData: data.data.data.user}
            }
        } catch {
            return {userData: null}
        }
        return {userData: null}
    },
    component: () => {
        return <Root user={null} />
    },
})