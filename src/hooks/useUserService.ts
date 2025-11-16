import {useMutation, useQuery} from "@tanstack/react-query";
import type {
    TUserGetMeResponseData,
    TUserLoginRequiredData,
    TUserLoginResponseData,
    TUserRegisterRequiredData
} from "@/shared/types/apiUserServices.t.ts";
import {userServiceGetMe, userServiceLogin, userServiceRegister} from "@/entity/userService.ts";

export function useGetMe () {
    return useQuery({
        queryKey: [userServiceGetMe.key],
        queryFn: async () => await userServiceGetMe.queryFn<TUserGetMeResponseData>()
    })
}

export function useLogin () {
    return useMutation({
        mutationKey: [userServiceLogin.key],
        mutationFn: async (data: TUserLoginRequiredData) => await userServiceLogin.queryFn<TUserLoginResponseData>(data)
    })
}

export function useRegister () {
    return useMutation({
        mutationKey: [userServiceRegister.key],
        mutationFn: async (data: TUserRegisterRequiredData) => await userServiceRegister.queryFn<TUserLoginResponseData>(data)
    })
}
