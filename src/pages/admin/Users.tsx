import {useState} from "react";
import type {TUserSearchParams} from "@/shared/types/apiUserServices.t.ts";
import {useGetUsers, useUpdateUserById} from "@/shared/hooks/useUserService.ts";
import {Table, TableBody, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {DataTableRow} from "@/widgets/DataTableRow.tsx";


function Users() {
    const [searchData, setSearchData] = useState<TUserSearchParams>({
        limit: 20,
        page: 1,
        sort: "ASC"
    })
    const {data, isPending, error, refetch} = useGetUsers(searchData)
    const {mutate, isPending: isPendingMutate, isSuccess, isError} = useUpdateUserById()


    console.log(data)

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Индекс</TableHead>
                        <TableHead>Роль</TableHead>
                        <TableHead>Имя</TableHead>
                        <TableHead>Фамилия</TableHead>
                        <TableHead>Почта</TableHead>
                        <TableHead>Номер</TableHead>
                        <TableHead>Создано:</TableHead>
                        <TableHead>Обновлено:</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {/*TODO: Обернуть компонент в итем и намутить диалог для изменения данных.
                    TODO Ну туда можно и удаление вставить*/}
                    {data?.data.data.users.map((e, index) => (
                        <DataTableRow
                            mutate={mutate}
                            isSuccess={isSuccess}
                            isError={isError}
                            isPending={isPendingMutate}
                            index={index}
                            data={e}
                            refetch={refetch}
                        />
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

//TODO: Не забыть про создание пользователя

export {Users};