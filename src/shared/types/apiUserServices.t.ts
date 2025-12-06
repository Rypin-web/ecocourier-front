import type {User} from "@/shared/providers/userProvider.tsx";
import type {AxiosRequestConfig} from "axios";

export type TUserLoginRequiredData = {
    email: string
    password: string
}

//TODO: Дописать для остальных сервисов

export type TUserGetMeResponseData = {
    user: User
}

export type TUserUpdateResponseData = {
    data: {
        user: User
        updatedData: TUserUpdateRequiredData
    }
}

export type TUserUpdateRequiredData = {
    first_name: string
    last_name?: string
    email: string
    phone: string
}

export type TUserLoginResponseData = {
    data: {
        user: User
        sessionToken: string
    }
}

export type TUserRegisterResponseData = {
    data: {
        user: User
    }
}

export type TUserRegisterRequiredData = {
    email: string
    password: string
    first_name: string
    last_name?: string
    phone: string
}


export type TUserRefreshResponseData = {
    data: {
        sessionToken: string
    }
}

export type TUserSearchParams = {
    limit: number
    page: number
    sort: 'ASC' | 'DESC'
}

export type TGetUsersResponseData = {
    data: {
        total: number
        users: User[]
    }
}

export type TUpdateUserByIdResponseData = {
    data: {
        user: User,
        updatedData: {
            email?: string
            password?: string
            first_name?: string
            last_name?: string
            phone?: string
        }
    }
}

export type useUpdateUserByIdMutationProps = {
    id: string
    data: {
        role: 'admin' | 'user' | 'courier'
        email: string
        password: string
        first_name: string
        last_name?: string
        phone: string
    }
    params?: AxiosRequestConfig['params']
}