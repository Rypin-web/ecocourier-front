import {useState} from "react";
import {useGetUsers, useUpdateUserById} from "@/shared/hooks/useUserService.ts";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {DataTableRow} from "@/widgets/DataTableRow.tsx";
import type {TUserSearchParams} from "@/shared/types/serchParams.t.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {PaginationElement} from "@/features/PaginationElement.tsx";
import {PaginationSkeleton} from "@/features/PaginationSkeleton.tsx";


function Users() {
    const [searchData, setSearchData] = useState<TUserSearchParams>({
        limit: 5,
        page: 1,
        sort: "ASC"
    })
    const {data, refetch} = useGetUsers(searchData)
    const {mutate, isPending: isPendingMutate, isSuccess, isError} = useUpdateUserById()

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        {['Индекс', 'Роль', 'Имя', 'Фамилия', 'Почта', 'Номер', 'Создано:', 'Обновлено:']
                            .map((e) => <TableHead>{e}</TableHead>)}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {/*TODO: Обернуть компонент в итем и намутить диалог для изменения данных.
                    TODO Ну туда можно и удаление вставить*/}
                    {data?.status ? data?.data.data.users.map((e, index) => (
                        <DataTableRow
                            mutate={mutate}
                            isSuccess={isSuccess}
                            isError={isError}
                            isPending={isPendingMutate}
                            data={e}
                            index={index}
                            refetch={refetch}
                        />
                    )) : new Array(searchData.limit).fill(0).map(() => (
                        <TableRow>
                            <TableCell colSpan={8}>
                                <Skeleton className='h-12 w-full' />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {data?.data.data.total ? (
                <PaginationElement
                    total={data?.data.data.total}
                    limit={searchData.limit}
                    activePage={searchData.page}
                    set={setSearchData}
                />
            ) : (<PaginationSkeleton />)}
        </div>
    );
}

//TODO: Не забыть про создание пользователя

export {Users};