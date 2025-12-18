import {useMutation, useQuery} from "@tanstack/react-query";
import {type AxiosRequestConfig} from "axios";
import type {TSearchParams} from "@/shared/types/serchParams.t.ts";
import type {ProductsSortBy} from "@/shared/types/entities.t.ts";
import {apiService, type TApiDefResponse} from "@/shared/utils/apiService.ts";
import type {TGetProductsResponse, TUpdateProductsRequest} from "@/shared/types/apiUserServices.t.ts";

export function useGetProducts(params: AxiosRequestConfig['params'] & TSearchParams<ProductsSortBy>) {
    return useQuery({
        queryKey: ['GET_PRODUCTS_ALL', params.sortBy, params.page, params.sort],
        queryFn: async () => await apiService.get<TApiDefResponse<TGetProductsResponse>>('/products', {
            params: params
        })
    })
}

export function useUpdateProduct() {
    return useMutation({
        mutationKey: ['PUT_PRODUCT'],
        mutationFn: async ({id, data, params}: TUpdateProductsRequest) => await apiService.put(
            `/products/${id}`,
            data,
            {params: params}
        )
    })
}

export function useDeleteProduct() {
    return useMutation({
        mutationKey: ['DELETE_PRODUCT'],
        mutationFn: async (id: string, params: AxiosRequestConfig['params']) => (
            await apiService.delete<TApiDefResponse<{ data: {} }>>(`/products/${id}`, {params: params})
        )
    })
}