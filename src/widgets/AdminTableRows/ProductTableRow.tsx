import type {QueryObserverResult, RefetchOptions, UseMutateFunction} from "@tanstack/react-query";
import type {AxiosResponse} from "axios";
import type {TApiDefResponse} from "@/shared/utils/apiService.ts";
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
    const defaultValues = {
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
            mutate({id: value.id, data: value as TUpdateProductsRequest['data']})
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
                    onSubmit={async (e) => {
                        e.preventDefault()
                        await form.handleSubmit()
                    }}
                >
                    {Object.keys(data).map((key) => {
                        if (['id', 'image', 'Category', 'createdAt', 'updatedAt'].includes(key)) return

                        return (
                            <form.AppField name={key as keyof typeof defaultValues} children={(field) => (
                                <field.FormInput field={field} key={key} placeholder={'Enter ' + key} label={key} />
                            )} />
                        )
                    })}

                    <DialogFooter className='flex flex-row !justify-between'>
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

// @ts-ignore
export {ProductTableRow};
