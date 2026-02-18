import {useMutation, useQuery} from "@tanstack/react-query";
import type {
  TGetCategoriesResponse,
  TUpdateCategoryRequest
} from "@/shared/types/apiUserServices.t.ts";
import {apiService, type TApiDefResponse} from "@/shared/utils/apiService.ts";
import type {AxiosRequestConfig} from "axios";
import type {TSearchParams} from "@/shared/types/serchParams.t.ts";
import type {CategorySortBy} from "@/shared/types/entities.t.ts";

export function useUpdateCategory() {
  return useMutation({
    mutationKey: ['PUT_CATEGORY'],
    mutationFn: async ({id, data}: TUpdateCategoryRequest) => await apiService.put(
      `/categories/${id}`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
  })
}

export function useGetCategories(params: AxiosRequestConfig['params'] & TSearchParams<CategorySortBy>) {
  return useQuery({
    queryKey: ['GET_CATEGORIES_ALL', params.sortBy, params.page, params.sort, params.q],
    queryFn: async () => await apiService.get<TApiDefResponse<TGetCategoriesResponse>>('/categories', {
      params: params
    })
  })
}

export function useDeleteCategory() {
  return useMutation({
    mutationKey: ['DELETE_CATEGORY'],
    mutationFn: async (id: string, params: AxiosRequestConfig['params']) => (
      await apiService.delete<TApiDefResponse<{ data: {} }>>(`/categories/${id}`, {params: params})
    )
  })
}