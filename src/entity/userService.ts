import type {TUserLoginRequiredData, TUserRegisterRequiredData} from "@/shared/types/apiUserServices.t.ts";
import {apiService, type TApiDefResponse} from "@/entity/apiService.ts";


export const userServiceGetMe = {
    key: 'USER_ME_GET',
    queryFn: <T>() => apiService.get<TApiDefResponse<T>>('/users')
}

export const userServiceLogin = {
    key: 'USER_LOGIN_POST',
    queryFn: <T>(data: TUserLoginRequiredData) => apiService.post<TApiDefResponse<T>>('/users/login', data)
}

export const userServiceRegister = {
    key: 'USER_REGISTER_POST',
    queryFn: <T>(data: TUserRegisterRequiredData) => apiService.post<TApiDefResponse<T>>('users/register', data)
}


