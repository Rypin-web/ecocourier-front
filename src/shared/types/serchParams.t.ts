export type TSearchParams<T> = {
    q?:string
    limit: number
    page: number
    sort: 'ASC' | 'DESC'
    sortBy: 'createdAt' | 'updatedAt' | 'id' | T
}