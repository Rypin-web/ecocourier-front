import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination.tsx";

type PaginationProps<T> = {
    total: number
    limit: number
    activePage: number
    set: (value: ((prev: T) => T) | T) => void
}

function PaginationElement<T>({total, limit, activePage, set}: PaginationProps<T>) {
    // Окей, я думаю на это стоит добавить комментарии, потому что я сам уже забыл как это дерьмо работает.
    // Тут мы пока что просто считаем сколько у нас всего страниц.
    const totalPages = Math.ceil(total / limit)
    //Потом делаем ограничение до 10 страниц, чтобы рендарилось для пагинации
    const paginationPages = totalPages > 10
        ? new Array(10).fill(0).map((_, index) => {
            // Все начинается с index + 1. Тут вроде как все понятно.
            // Дальше высчитываем смещение влево (activePage - limit - Math.ceil(totalPages / 4)).
            // Деление на 8, это просто смещение, чтобы новые страницы рендерились, начиная с 6.
            // Когда перейдем на 4 страницу появится 11 и пропадет 1.
            // Короче это разбирайте сами я хз как оно работает (activePage - limit - Math...), но работает.
            // И дальше просто плюсуем чтобы были 11, 12 и тд.
            const calculatedPage = index + 1 + Math.max(0, activePage - limit - Math.ceil(totalPages / 4))
            // Это для того, чтобы отрисовывались предыдущие (2, 3, >4<, 5, 6, ...)
            if (calculatedPage > totalPages) return calculatedPage - 10
            return calculatedPage
        })// Ну а это ультра простая система, если с ^^^ этим разберетесь то с этим уже там-сям справитесь 8Р
        : new Array(totalPages).fill(0).map((_, index) => index + 1)
    const changePage = (itemPage: number) => {
        set((prev) => ({
            ...prev,
            page: itemPage
        }))
    }

    return (
        <Pagination className={'mt-3'}>
            <PaginationContent>
                <PaginationItem
                    onClick={() => {
                        if (!(activePage - 1)) return
                        set((prev) => ({
                            ...prev,
                            page: activePage - 1
                        }))
                    }}
                    className={'cursor-pointer'}
                >
                    <PaginationPrevious> Назад </PaginationPrevious>
                </PaginationItem>

                {(Math.ceil(totalPages / 2) - activePage - 1) <= 0 && totalPages > 10 && (
                    <PaginationItem>
                        <PaginationEllipsis className={'stroke-white/50'} />
                    </PaginationItem>
                )}
                {/*
                Сортировать надо обязательно из-за этого
                (if (calculatedPage > totalPages) return calculatedPage - 10)
                */}
                {paginationPages.sort((a, b) => a - b).map((e) => (
                    <PaginationItem className={'cursor-pointer'}>
                        <PaginationLink onClick={() => changePage(e)} isActive={e === activePage} key={e}>
                            {e}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                {(Math.ceil(totalPages / 2) - activePage) >= 0 && totalPages > 10 && (
                    <PaginationItem>
                        <PaginationEllipsis className={'stroke-white/50'} />
                    </PaginationItem>
                )}
                <PaginationItem>
                    <PaginationNext onClick={() => {
                        if (activePage + 1 > totalPages) return
                        set((prev) => ({
                            ...prev,
                            page: activePage + 1
                        }))
                    }}>
                        Вперед
                    </PaginationNext>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}

export {PaginationElement};