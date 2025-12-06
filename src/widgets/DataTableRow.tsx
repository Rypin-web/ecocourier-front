import {TableCell, TableRow} from "@/components/ui/table.tsx";
import {cn} from "@/shared/utils/cn";
import {useEffect, useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {useAppForm} from "@/shared/hooks/useAppForm.ts";
import type {QueryObserverResult, RefetchOptions, UseMutateFunction} from "@tanstack/react-query";
import type {AxiosResponse} from "axios";
import type {TApiDefResponse} from "@/shared/utils/apiService.ts";
import {toast} from "sonner";

interface DataTableProps {
    data: object & { id: string },
    index: number
    isPending: boolean
    isSuccess: boolean
    isError: boolean
    mutate: UseMutateFunction<AxiosResponse<TApiDefResponse<any>, any, {}>, Error, any, unknown>
    refetch: (options?: RefetchOptions | undefined) =>
        Promise<QueryObserverResult<AxiosResponse<any, any, {}>, Error>>
}

function DataTableRow({data, index, mutate, refetch, isPending, isError, isSuccess}: DataTableProps) {
    const toggleIsOpenChangeRow = () => setIsOpenChangeRow(!isOpenChangeRow)
    const [isOpenChangeRow, setIsOpenChangeRow] = useState(false)

    const defaultValues = {} as DataTableProps['data']
    Object.entries(data).forEach(([key, value]) => (
        defaultValues[key as keyof DataTableProps['data']] = value
    ))
    const form = useAppForm({
        defaultValues: defaultValues,
        onSubmit: function ({value}) {
            console.log('submit', this.defaultValues)
            mutate({id: value.id, data: value})
        }
    })

    useEffect(() => {
        if (isError) toast.error('Не удалось изменить')
        if (isSuccess && isOpenChangeRow) {
            toast.success('Изменения выполнены!')
            refetch()
            setIsOpenChangeRow(false)
        }
    }, [isError, isSuccess, isOpenChangeRow])

    return (
        <Dialog open={isOpenChangeRow} onOpenChange={toggleIsOpenChangeRow}>
            <DialogTrigger asChild>
                <TableRow key={data.id} className={index % 2 === 0 ? cn('bg-white/5 h-15') : 'h-15'}>
                    {Object.values(data).map((e) => (
                        <TableCell>
                            {e}
                        </TableCell>
                    ))}
                </TableRow>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Изменить данные
                    </DialogTitle>
                </DialogHeader>
                <form
                    onSubmit={async (e) => {
                        e.preventDefault()
                        await form.handleSubmit()
                    }}
                >
                    {Object.keys(data).map((key) => {
                        if (['id', 'createdAt', 'updatedAt'].includes(key)) return

                        return <form.AppField name={key as keyof DataTableProps['data']}
                            children={(field) => (
                                <field.FormInput field={field} key={key} label={key} placeholder={'Enter ' + key} />
                            )} />
                    })}
                    <DialogFooter>
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
    )
}

export {DataTableRow};