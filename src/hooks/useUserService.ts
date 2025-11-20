import {useMutation, useQuery} from "@tanstack/react-query";
import type {
    TUserGetMeResponseData,
    TUserLoginRequiredData,
    TUserLoginResponseData,
    TUserRegisterRequiredData
} from "@/shared/types/apiUserServices.t.ts";
import {userServiceGetMe, userServiceLogin, userServiceRegister} from "@/entity/userService.ts";
import type {AxiosRequestConfig} from "axios";

export function useGetMe(params?: AxiosRequestConfig['params']) {
    return useQuery({
        queryKey: [userServiceGetMe.key],
        queryFn: async () =>
            await userServiceGetMe.queryFn<TUserGetMeResponseData>(params)
    })
}

export function useLogin() {
    return useMutation({
        mutationKey: [userServiceLogin.key],
        mutationFn: async ({data, params}: { data: TUserLoginRequiredData, params?: AxiosRequestConfig['params'] }) =>
            await userServiceLogin.queryFn<TUserLoginResponseData>(data, params)
    })
}

export function useRegister() {
    return useMutation({
        mutationKey: [userServiceRegister.key],
        mutationFn: async ({data, params}: {
            data: TUserRegisterRequiredData,
            params?: AxiosRequestConfig['params']
        }) =>
            await userServiceRegister.queryFn<TUserLoginResponseData>(data, params)
    })
}
