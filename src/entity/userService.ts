import type {TUserLoginRequiredData, TUserRegisterRequiredData} from "@/shared/types/apiUserServices.t.ts";
import {apiService, type TApiDefResponse} from "@/entity/apiService.ts";


export function userService () {
    const getMe = {
        key: 'USER_ME_GET',
        queryFn: <T>() => apiService.get<TApiDefResponse<T>>('/users')
    }
    const login = {
        key: 'USER_LOGIN_POST',
        queryFn: <T>(data: TUserLoginRequiredData) => apiService.post<TApiDefResponse<T>>('/users/login', data)
    }
    const register = {
        key: 'USER_REGISTER_POST',
        queryFn: <T>(data: TUserRegisterRequiredData) => apiService.post<TApiDefResponse<T>>('users/register', data)
    }

    return {
        getMe,
        login,
        register
    }
}

