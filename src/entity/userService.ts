import type {TUserLoginRequiredData, TUserRegisterRequiredData} from "@/shared/types/apiUserServices.t.ts";
import {apiService, type TApiDefResponse} from "@/entity/apiService.ts";
import type {AxiosRequestConfig} from "axios";

//TODO : Расширить сервис
export const userServiceGetMe = {
    key: 'USER_ME_GET',
    queryFn: <T>(params?: AxiosRequestConfig['params']) =>
        apiService.get<TApiDefResponse<T>>('/users', params)
}

export const userServiceLogin = {
    key: 'USER_LOGIN_POST',
    queryFn: <T>(data: TUserLoginRequiredData, params?: AxiosRequestConfig['params']) =>
        apiService.post<TApiDefResponse<T>>('/users/login', data, {params: params})
}

export const userServiceRegister = {
    key: 'USER_REGISTER_POST',
    queryFn: <T>(data: TUserRegisterRequiredData, params?: AxiosRequestConfig['params']) =>
        apiService.post<TApiDefResponse<T>>('users/register', data, {params: params})
}

export const userServiceGetUserBasket = {
    key: 'USER_BASKET_GET',
    queryFn: <T>(id: string) =>
        apiService.get<TApiDefResponse<T>>(`/users/${id}/basket`)
}

export const userServiceGetAll = {
    key: 'USER_GET_ALL',
    queryFn: <T>() =>
        apiService.get<TApiDefResponse<T>>('/users')
}