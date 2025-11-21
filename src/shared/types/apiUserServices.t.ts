export type TUserLoginRequiredData = {
    email: string
    password: string
}

//TODO: Дописать для остальных сервисов

export type TUserGetMeResponseData = {
    user: {
        id: string
        first_name: string
        last_name: string
        phone: string
        email: string
        role: string
        createdAt: string
        updatedAt: string
    }
}

export type TUserLoginResponseData = {
    user: {
        id: string
        first_name: string
        last_name: string
        phone: string
        role: string
        email: string
        createdAt: string
        updatedAt: string
    }
    sessionToken: string
}

export type TUserRegisterResponseData = {
    data: {
        user: {
            id: string
            first_name: string
            last_name: string
            phone: string
            role: string
            email: string
            createdAt: string
            updatedAt: string
        }
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