import {TableCell, TableRow} from "@/components/ui/table.tsx";
import {cn} from "@/shared/utils/cn";

interface DataTableProps {
    data: object & { id: string },
    index: number
}

function DataTableRow({data, index}: DataTableProps) {
    return (
        <TableRow key={data.id} className={index % 2 === 0 ? cn('bg-white/5 h-15') : 'h-15'}>
            {Object.values(data).map((e) => (
                <TableCell>
                    {e}
                </TableCell>
            ))}
        </TableRow>
    )
}

export {DataTableRow};