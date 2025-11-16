import axios, {type InternalAxiosRequestConfig} from "axios";
import type {TUserRefreshResponseData} from "@/shared/types/apiUserServices.t.ts";

export type TApiDefResponse<T> = {
    msg:string,
    data: T
}
export const apiService = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})

apiService.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

apiService.interceptors.response.use((res) => res, async (err) => {
    if (axios.isAxiosError(err)) {
        const originalReq = err.config as InternalAxiosRequestConfig<unknown> & { _retry?: boolean } | undefined

        if(originalReq?.url === '/users/refresh') {
            localStorage.removeItem('token')
            window.location.href = '/login'
            return Promise.reject(err)
        }

        if (err.response?.status === 401 && originalReq && !originalReq?._retry) {
            originalReq._retry = true

            try {
                const {data} = await apiService.get<TApiDefResponse<TUserRefreshResponseData>>('/users/refresh')
                localStorage.setItem('token', data.data.sessionToken)

                originalReq.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
                return apiService(originalReq)
            } catch (e) {
                localStorage.removeItem('token')
                window.location.href = '/login'
                return Promise.reject(e)
            }
        }
    }
    return Promise.reject(err)
})