import type {QueryObserverResult, RefetchOptions, UseMutateFunction} from "@tanstack/react-query";
import type {AxiosResponse} from "axios";
import {type TApiDefResponse} from "@/shared/utils/apiService.ts";
import type {TGetCategoriesResponse, TUpdateCategoryRequest} from "@/shared/types/apiUserServices.t.ts";
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
import type {Categories} from "@/shared/types/entities.t.ts";
import {useAppForm} from "@/shared/hooks/useAppForm.ts";
import {toast} from "sonner";
import {Button} from "@/components/ui/button.tsx";

interface CategoriesTableRowProps {
  index: number
  data: Categories
  isSuccess: boolean
  isPending: boolean
  isError: boolean
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<AxiosResponse<TApiDefResponse<TGetCategoriesResponse>, any, {}>, Error>>
  mutate: UseMutateFunction<AxiosResponse<any, any, {}>, Error, TUpdateCategoryRequest, unknown>
  reset: () => void
  deleteCategory: UseMutateFunction<AxiosResponse<TApiDefResponse<{ data: {} }>, any, {}>, Error, string, unknown>
  resetDelete: () => void
  isErrorDelete: boolean
  isPendingDelete: boolean
  isSuccessDelete: boolean
}

interface defaultValuesForm {
  id: string
  name: string
  description?: string
  image: File | string | undefined
  createdAt: string
  updatedAt: string
}

function CategoriesTableRow(
  {
    data,
    isError,
    isPending,
    isSuccess,
    refetch,
    index,
    mutate,
    reset,
    deleteCategory,
    resetDelete,
    isErrorDelete,
    isSuccessDelete,
    isPendingDelete
  }: CategoriesTableRowProps) {
  const [isOpenChangeRow, setIsOpenChangeRow] = useState(false)
  const toggleIsOpenChangeRow = () => setIsOpenChangeRow(!isOpenChangeRow)
  const defaultValues: defaultValuesForm = {
    id: data.id,
    name: data.name,
    description: data.description,
    image: data.image,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  }
  const form = useAppForm({
    defaultValues: defaultValues,
    onSubmit: ({value}) => {
      const formData = new FormData()
      formData.append('id', value.id)
      formData.append('name', value.name)
      formData.append('description', value.description ?? '')
      formData.append('createdAt', value.createdAt)
      formData.append('updatedAt', value.updatedAt)
      if (value.image instanceof File) {
        const imageFile = new File([value.image], 'image.' + value.image.type.split('/').pop(), {
          type: value.image.type
        })
        formData.append('image', imageFile)
      }

      mutate({
        id: value.id,
        data: formData as unknown as TUpdateCategoryRequest['data']
      })
    }
  })

  useEffect(() => {
    if (isErrorDelete && isOpenChangeRow) toast.error('Не удалось удалить')
    if (isSuccessDelete && isOpenChangeRow) {
      toast.success(data.name + ' удалена')
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
          <TableCell>{data.name}</TableCell>
          <TableCell>{data.description}</TableCell>
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
            if (['id', 'createdAt', 'updatedAt'].includes(key)) return

            if (key === 'image') return (
              <form.AppField name={key as keyof typeof defaultValues} children={(field) => (
                <field.FormDnd field={field} key={key} image={data[key]} />
              )} />
            )

            return (
              <form.AppField name={key as keyof typeof defaultValues} children={(field) => (
                <field.FormInput field={field} key={key} placeholder={'Enter ' + key} label={key} />
              )} />
            )
          })}

          <DialogFooter className='flex flex-row mt-5 !justify-between'>
            <Button variant={"secondary"} disabled={isPendingDelete} type={'button'} onClick={() => {
              deleteCategory(data.id)
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

export {CategoriesTableRow};
