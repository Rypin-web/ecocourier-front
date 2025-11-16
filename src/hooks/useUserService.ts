import {useMutation, useQuery} from "@tanstack/react-query";
import {userService} from "@/entity/userService.ts";
import type {
    TUserGetMeResponseData,
    TUserLoginRequiredData,
    TUserLoginResponseData,
    TUserRegisterRequiredData
} from "@/shared/types/apiUserServices.t.ts";

export function useGetMe () {
    const {getMe} = userService()

    return useQuery({
        queryKey: [getMe.key],
        queryFn: async () => await getMe.queryFn<TUserGetMeResponseData>()
    })
}

export function useLogin (data: TUserLoginRequiredData) {
    const {login} = userService()

    return useMutation({
        mutationKey: [login.key],
        mutationFn: async () => await login.queryFn<TUserLoginResponseData>(data)
    })
}

export function useRegister (data: TUserRegisterRequiredData) {
    const {register} = userService()

    return useMutation({
        mutationKey: [register.key],
        mutationFn: async () => await register.queryFn<TUserLoginResponseData>(data)
    })
}
