import {useState} from "react";
import {useGetUsers, useUpdateUserById} from "@/shared/hooks/useUserService.ts";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {DefaultTableRow} from "@/widgets/AdminTableRows/DefaultTableRow.tsx";
import type {TSearchParams} from "@/shared/types/serchParams.t.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {PaginationElement} from "@/features/PaginationElement.tsx";
import {PaginationSkeleton} from "@/features/PaginationSkeleton.tsx";
import {SortButton} from "@/features/sortButton.tsx";
import {SelectSortBy} from "@/features/SelectSortBy.tsx";
import type {UserSortBy} from "@/shared/types/entities.t.ts";

type UserSearchParams = TSearchParams<UserSortBy>

function Users() {
    const [searchData, setSearchData] = useState<UserSearchParams>({
        limit: 5,
        page: 1,
        sort: "ASC",
        sortBy: 'createdAt'
    })
    const {data, refetch} = useGetUsers(searchData)
    const {mutate, isPending: isPendingMutate, isSuccess, isError, reset} = useUpdateUserById()

    console.log(searchData)

    return (
        <div>
            <div className='flex flex-row gap-3 mb-5 place-items-center'>
                <SortButton<UserSearchParams> set={setSearchData} type={searchData.sort} />
                <span>Сортировать по: </span>
                <SelectSortBy<UserSearchParams> set={setSearchData} sortBy={searchData.sortBy} values={{
                    id: 'Индекс',
                    role: 'Роль',
                    first_name: 'Имя',
                    last_name: 'Фамилия',
                    email: 'Почта',
                    phone: 'Телефон',
                    createdAt: 'Создано',
                    updatedAt: 'Обновлено'
                }} />
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        {['Индекс', 'Роль', 'Имя', 'Фамилия', 'Почта', 'Номер', 'Создано:', 'Обновлено:']
                            .map((e) => <TableHead>{e}</TableHead>)}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.status ? data?.data.data.users.map((e, index) => (
                        <DefaultTableRow
                            mutate={mutate}
                            isSuccess={isSuccess}
                            isError={isError}
                            isPending={isPendingMutate}
                            data={e}
                            index={index}
                            refetch={refetch}
                            reset={reset}
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
                <PaginationElement<UserSearchParams>
                    total={data?.data.data.total}
                    limit={searchData.limit}
                    activePage={searchData.page}
                    set={setSearchData}
                />
            ) : (<PaginationSkeleton />)}
        </div>
    );
}

export {Users};