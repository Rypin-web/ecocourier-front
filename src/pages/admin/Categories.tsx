import {useState} from "react";
import type {TSearchParams} from "@/shared/types/serchParams.t.ts";
import type {CategorySortBy} from "@/shared/types/entities.t.ts";
import {useDeleteCategory, useGetCategories, useUpdateCategory} from "@/shared/hooks/useCategoriesService.ts";
import {SortButton} from "@/features/SortButton.tsx";
import {SelectSortBy} from "@/features/SelectSortBy.tsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {PaginationElement} from "@/features/PaginationElement.tsx";
import {PaginationSkeleton} from "@/features/PaginationSkeleton.tsx";
import {CategoriesTableRow} from "@/widgets/AdminTableRows/CategoriesTableRow.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useDebounce} from "@/shared/hooks/useDebounce.ts";
import {useSearchParams} from "@/shared/hooks/useSearchParams.ts";

type CategoriesSearchParams = TSearchParams<CategorySortBy>

function Categories() {
  const [searchCategory, setSearchCategory] = useState('')
  const debouncedSearch = useDebounce(searchCategory, 500)
  const [searchData, setSearchData] = useSearchParams<CategoriesSearchParams>({
    q: debouncedSearch,
    limit: 5,
    page: 1,
    sort: "ASC",
    sortBy: 'createdAt'
  })
  const {data, isSuccess: isSuccessQuery, refetch} = useGetCategories(searchData)
  console.log('@@@@', data)
  const {mutate, isSuccess, isError, isPending, reset} = useUpdateCategory()
  const {
    mutate: deleteCategory,
    isSuccess: isSuccessDelete,
    reset: resetDelete,
    isError: isErrorDelete,
    isPending: isPendingDelete
  } = useDeleteCategory()

  return (
    <div>
      <div className='flex flex-row gap-3 mb-5 place-items-center'>
        <Input className='max-w-[360px]' placeholder='Искать...' onChange={(e) => setSearchCategory(e.target.value)} />
        <SortButton<CategoriesSearchParams> set={setSearchData} type={searchData.sort} />
        <span>Сортировать по: </span>
        <SelectSortBy<CategoriesSearchParams> set={setSearchData} sortBy={searchData.sortBy} values={{
          id: 'Индекс',
          name: 'Название',
          description: 'Описание',
          createdAt: 'Создано',
          updatedAt: 'Обновлено'
        }} />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            {['Индекс', 'Название', 'Описание', 'Изображение', 'Создано:', 'Обновлено:']
              .map((e) => <TableHead key={e}>{e}</TableHead>)}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isSuccessQuery && data?.data.data.categories.map((e, index) => (
            <CategoriesTableRow
              key={index}
              data={e}
              index={index}
              refetch={refetch}
              mutate={mutate}
              isError={isError}
              isSuccess={isSuccess}
              isPending={isPending}
              reset={reset}
              isErrorDelete={isErrorDelete}
              isPendingDelete={isPendingDelete}
              resetDelete={resetDelete}
              deleteCategory={deleteCategory}
              isSuccessDelete={isSuccessDelete}
            />
          ))}
          {!isSuccessQuery && (new Array(searchData.limit).fill(0).map((e) => (
              <TableRow key={e}>
                <TableCell colSpan={6}>
                  <Skeleton className='h-12 w-full' />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      {data?.data.data.total ? (
        <PaginationElement<CategoriesSearchParams>
          total={data?.data.data.total}
          limit={searchData.limit}
          activePage={searchData.page}
          set={setSearchData}
        />
      ) : (<PaginationSkeleton />)}
    </div>
  );
}

export {Categories};
