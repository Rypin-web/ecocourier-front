import {useState} from "react";
import type {TSearchParams} from "@/shared/types/serchParams.t.ts";
import type {ProductsSortBy} from "@/shared/types/entities.t.ts";
import {useGetProducts, useUpdateProduct} from "@/shared/hooks/useProductsService.ts";
import {SortButton} from "@/features/sortButton.tsx";
import {SelectSortBy} from "@/features/SelectSortBy.tsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {DataTableRow} from "@/widgets/DataTableRow.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {PaginationElement} from "@/features/PaginationElement.tsx";
import {PaginationSkeleton} from "@/features/PaginationSkeleton.tsx";

type ProductsSearchParams = TSearchParams<ProductsSortBy>

function Products() {
    const [searchData, setSearchData] = useState<ProductsSearchParams>({
        limit: 5,
        page: 1,
        sort: "ASC",
        sortBy: 'createdAt'
    })
    const {data, refetch} = useGetProducts(searchData)
    const {mutate, isPending, isSuccess, isError} = useUpdateProduct()
    console.log(data)

    return (
        <div>
            <div className='flex flex-row gap-3 mb-5 place-items-center'>
                <SortButton<ProductsSearchParams> set={setSearchData} type={searchData.sort} />
                <span>Сортировать по: </span>
                <SelectSortBy<ProductsSearchParams> set={setSearchData} sortBy={searchData.sortBy} values={{
                    id: 'Индекс',
                    title: 'Название',
                    description: 'Описание',
                    price: 'Цена',
                    image: 'Изображение',
                    createdAt: 'Создано',
                    updatedAt: 'Обновлено'
                }} />
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        {['Индекс', 'Название', 'Описание', 'Цена', 'Изображение', 'Создано:', 'Обновлено:']
                            .map((e) => <TableHead key={e}>{e}</TableHead>)}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.status ? data?.data.data.products.map((e, index) => (
                        <DataTableRow
                            mutate={mutate}
                            isSuccess={isSuccess}
                            isError={isError}
                            isPending={isPending}
                            data={e}
                            index={index}
                            refetch={refetch}
                            key={index}
                        />
                    )) : new Array(searchData.limit).fill(0).map((e) => (
                        <TableRow key={e}>
                            <TableCell colSpan={8}>
                                <Skeleton className='h-12 w-full' />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {data?.data.data.total ? (
                <PaginationElement<ProductsSearchParams>
                    total={data?.data.data.total}
                    limit={searchData.limit}
                    activePage={searchData.page}
                    set={setSearchData}
                />
            ) : (<PaginationSkeleton />)}
        </div>
    );
}

export {Products};