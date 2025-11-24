import {useMutation, useQuery} from "@tanstack/react-query";
import type {
    TUserGetMeResponseData,
    TUserLoginRequiredData,
    TUserLoginResponseData,
    TUserRegisterRequiredData, TUserRegisterResponseData, TUserUpdateRequiredData, TUserUpdateResponseData
} from "@/shared/types/apiUserServices.t.ts";
import type {AxiosRequestConfig} from "axios";
import {apiService, type TApiDefResponse} from "@/shared/utils/apiService.ts";

export function useGetMe(params?: AxiosRequestConfig['params']) {
    return useQuery({
        queryKey: ['GET_USER_ME'],
        queryFn: async () =>
            await apiService.get<TApiDefResponse<TUserGetMeResponseData>>('/users', params)
    })
}

export function useLogin() {
    return useMutation({
        mutationKey: ['POST_USER_LOGIN'],
        mutationFn: async ({data, params}: { data: TUserLoginRequiredData, params?: AxiosRequestConfig['params'] }) =>
            await apiService.post<TApiDefResponse<TUserLoginResponseData>>('/users/login', data, {params: params})
    })
}

export function useRegister() {
    return useMutation({
        mutationKey: ['POST_USER_REGISTER'],
        mutationFn: async ({data, params}: {
            data: TUserRegisterRequiredData,
            params?: AxiosRequestConfig['params']
        }) =>
            await apiService.post<TApiDefResponse<TUserRegisterResponseData>>('/users/register', data, {params: params})
    })
}

export function useLogout() {
    return useMutation({
        mutationKey: ['DELETE_USER_LOGOUT'],
        mutationFn: async () =>
            await apiService.delete<TApiDefResponse<null>>('/users/logout')
    })
}

export function useUpdateUser () {
    return useMutation({
        mutationKey: ['PUT_USER_UPDATE'],
        mutationFn: async ({data, params}: {
            data: TUserUpdateRequiredData,
            params?: AxiosRequestConfig['params']
        }) =>
            await apiService.put<TApiDefResponse<TUserUpdateResponseData>>('/users/me', data, {params: params})
    })
}
