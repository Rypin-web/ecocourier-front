import type {QueryObserverResult, RefetchOptions, UseMutateFunction} from "@tanstack/react-query";
import type {AxiosResponse} from "axios";
import {apiService, type TApiDefResponse} from "@/shared/utils/apiService.ts";
import type {TGetProductsResponse, TUpdateProductsRequest} from "@/shared/types/apiUserServices.t.ts";
import {useEffect, useState} from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog.tsx";
import {TableCell, TableRow} from "@/components/ui/table.tsx";
import {cn} from "@/shared/utils/cn.ts";
import {AspectRatio} from "@/components/ui/aspect-ratio.tsx";
import {apiUrl} from "@/shared/constants/api.ts";
import type {Products} from "@/shared/types/entities.t.ts";
import {useAppForm} from "@/shared/hooks/useAppForm.ts";
import {toast} from "sonner";
import {Button} from "@/components/ui/button.tsx";

interface ProductTableRowProps {
  index: number
  data: Products
  isSuccess: boolean
  isPending: boolean
  isError: boolean
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<AxiosResponse<TApiDefResponse<TGetProductsResponse>, any, {}>, Error>>
  mutate: UseMutateFunction<AxiosResponse<any, any, {}>, Error, TUpdateProductsRequest, unknown>
  reset: () => void
  deleteProduct: UseMutateFunction<AxiosResponse<TApiDefResponse<{ data: {} }>, any, {}>, Error, string, unknown>
  resetDelete: () => void
  isErrorDelete: boolean
  isPendingDelete: boolean
  isSuccessDelete: boolean
}

interface defaultValuesForm {
  id: string
  title: string
  price: number
  description?: string
  category_id: string
  image: File | string | undefined
  createdAt: string
  updatedAt: string
}

function ProductTableRow(
  {
    data,
    isError,
    isPending,
    isSuccess,
    refetch,
    index,
    mutate,
    reset,
    deleteProduct,
    resetDelete,
    isErrorDelete,
    isSuccessDelete,
    isPendingDelete
  }: ProductTableRowProps) {
  const [isOpenChangeRow, setIsOpenChangeRow] = useState(false)
  const toggleIsOpenChangeRow = () => setIsOpenChangeRow(!isOpenChangeRow)
  const defaultValues: defaultValuesForm = {
    id: data.id,
    title: data.title,
    price: data.price,
    description: data.description,
    category_id: data.category_id,
    image: data.image,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  }
  const form = useAppForm({
    defaultValues: defaultValues,
    onSubmit: ({value}) => {
      const formData = new FormData()
      formData.append('id', value.id)
      formData.append('title', value.title)
      formData.append('price', value.price.toString())
      formData.append('description', value.description ?? '')
      formData.append('category_id', value.category_id)
      formData.append('createdAt', value.createdAt)
      formData.append('updatedAt', value.updatedAt)
      if (value.image instanceof File) {
        const imageFile = new File([value.image], 'image.' + value.image.type.split('/').pop(), {
          type: value.image.type
        })
        formData.append('image', imageFile)
      }
      console.log('formData', formData)


      mutate({
        id: value.id,
        data: formData as unknown as TUpdateProductsRequest['data']
      })
    }
  })

  useEffect(() => {
    if (isErrorDelete && isOpenChangeRow) toast.error('Не удалось удалить')
    if (isSuccessDelete && isOpenChangeRow) {
      toast.success(data.title + ' удален')
      refetch()
      resetDelete()
      setIsOpenChangeRow(false)
    }
  }, [isErrorDelete, isPendingDelete, isOpenChangeRow])

  useEffect(() => {
    if (isError && isOpenChangeRow) toast.error('Не удалось изменить')
    if (isSuccess && isOpenChangeRow) {
      toast.success('Успешно!')
      refetch()
      reset()
      setIsOpenChangeRow(false)
    }
  }, [isSuccess, isError, isOpenChangeRow])

  return (
    <Dialog onOpenChange={toggleIsOpenChangeRow} open={isOpenChangeRow}>
      <DialogTrigger asChild>
        <TableRow key={data.id} className={index % 2 === 0 ? cn('bg-white/5 h-15') : 'h-15'}>
          <TableCell>{data.id}</TableCell>
          <TableCell>{data.title}</TableCell>
          <TableCell>{data.price}</TableCell>
          <TableCell>{data.description}</TableCell>
          <TableCell>{data.Category.name}</TableCell>
          <TableCell>
            <AspectRatio ratio={1 / 1}>
              <img className='rounded-xl w-full h-full' src={apiUrl + data.image} />
            </AspectRatio>
          </TableCell>
          <TableCell>{data.createdAt}</TableCell>
          <TableCell>{data.updatedAt}</TableCell>
        </TableRow>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Изменить данные</DialogTitle>
        </DialogHeader>
        <form
          className='overflow-y-scroll max-h-[700px]'
          onSubmit={async (e) => {
            e.preventDefault()
            await form.handleSubmit()
          }}
        >
          {Object.keys(data).map((key) => {
            if (['id', 'Category', 'createdAt', 'updatedAt'].includes(key)) return

            if (key === 'image') return (
              <form.AppField name={key as keyof typeof defaultValues} children={(field) => (
                <field.FormDnd field={field} key={key} image={data[key]} />
              )} />
            )

            if (key === 'category_id') return (
              <form.AppField name={key as keyof typeof defaultValues} children={(field) => (
                <field.FormSelect
                  field={field}
                  placeholder={'Выберите категорию'}
                  label={'Категория'}
                  fetchEntities={(search) => apiService.get('/categories/', {
                    params: {
                      q: search,
                      limit: 100,
                      page: 1
                    }
                  })}
                />
              )}
              />)

            return (
              <form.AppField name={key as keyof typeof defaultValues} children={(field) => (
                <field.FormInput field={field} key={key} placeholder={'Enter ' + key} label={key} />
              )} />
            )
          })}

          <DialogFooter className='flex flex-row mt-5 !justify-between'>
            <Button variant={"secondary"} disabled={isPendingDelete} type={'button'} onClick={() => {
              deleteProduct(data.id)
            }}>Удалить</Button>
            <form.AppForm>
              <form.SubmitButton
                isPending={isPending}
                text={'Изменить'}
                className={'flex w-fit'}
              />
            </form.AppForm>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export {ProductTableRow};
