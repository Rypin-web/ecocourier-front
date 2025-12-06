import {TableCell, TableRow} from "@/components/ui/table.tsx";
import {cn} from "@/shared/utils/cn";
import {useState} from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog.tsx";
import {useAppForm} from "@/shared/hooks/useAppForm.ts";

interface DataTableProps {
    data: object & { id: string, first_name: string },
    index: number
}

function DataTableRow({data, index}: DataTableProps) {
    const toggleIsOpenChangeRow = () => setIsOpenChangeRow(!isOpenChangeRow)
    const [isOpenChangeRow, setIsOpenChangeRow] = useState(false)
    const defaultValues = {} as DataTableProps['data']
    Object.entries(data).forEach(([key, value]) => (
        defaultValues[key as keyof DataTableProps['data']] = value
    ))
    const form = useAppForm({
        defaultValues: defaultValues,
        onSubmit: function () {
            console.log('submit', this.defaultValues)
        }
    })

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
                        {data.first_name}
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

                </form>
            </DialogContent>
        </Dialog>
    )
}

export {DataTableRow};