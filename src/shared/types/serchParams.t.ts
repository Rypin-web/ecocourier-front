export type TUserSearchParams<T> = {
    limit: number
    page: number
    sort: 'ASC' | 'DESC'
    sortBy: 'createdAt' | 'updatedAt' | 'id' | T
}