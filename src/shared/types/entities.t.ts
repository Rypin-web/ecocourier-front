export type UserRole = 'user' | 'courier' | 'admin'

export type User = {
    id: string
    first_name: string
    last_name: string
    phone: string
    email: string
    role: UserRole
    createdAt: string
    updatedAt: string
}

export type UserSortBy = 'role' | 'first_name' | 'last_name' | 'email' | 'phone'
export type ProductsSortBy = 'title' | 'price' | 'category_id'

export type Basket = {
    id: string
    userId: string
    productId: string
    quantity: number
    createdAt: string
    updatedAt: string
}

export type Categories = {
    id: string
    name: string
    description?: string
    image?: string
    createdAt: string
    updatedAt: string
}

export type Products = {
    id: string
    title: string
    description?: string
    price: number
    image?: string
    category_id: Categories
    createdAt: string
    updatedAt: string
}