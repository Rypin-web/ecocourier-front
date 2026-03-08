import type {AxiosRequestConfig} from "axios";
import type {Categories, Products, User, UserRole} from "@/shared/types/entities.t.ts";

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


export type TGetUsersResponseData = {
    data: {
        total: number
        data: User[]
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
        role: UserRole
        email: string
        password: string
        first_name: string
        last_name?: string
        phone: string
    }
    params?: AxiosRequestConfig['params']
}

export type TGetProductsResponse = {
    data: {
        total: number
        data: Products[]
    }
}

export type TGetCategoriesResponse = {
    data: {
        total: number
        data: Categories[]
    }
}

export type TUpdateProductsRequest = {
    id:string
    data: {
        id: string
        title:string
        description?: string
        price: number
        image: string
        category_id: string
        createdAt: string
        updatedAt: string
    }
}

export type TCreateProductRequest = {
    title: string
    description?: string
    price: number
    image?: File
    category_id: string
}

export type TCreateProductsResponse = {
    data: Products
}

export type TUpdateCategoryRequest = {
    id: string,
    data: {
        id: string
        name: string
        description?: string
        image: string
        createdAt: string
        updatedAt: string
    }
}