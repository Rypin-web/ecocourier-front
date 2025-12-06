export type User = {
    id: string
    first_name: string
    last_name: string
    phone: string
    email: string
    role: 'user' | 'courier' | 'admin'
    createdAt: string
    updatedAt: string
}

export type Basket = {
    id: string
    userId: string
    productId: string
    quantity: number
    createdAt: string
    updatedAt: string
}