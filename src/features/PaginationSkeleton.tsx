import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationNext, PaginationPrevious
} from "@/components/ui/pagination.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";

function PaginationSkeleton() {
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <Skeleton>
                        <PaginationPrevious>Назад</PaginationPrevious>
                    </Skeleton>
                </PaginationItem>
                <PaginationItem>
                    <Skeleton>
                        <PaginationEllipsis className='stroke-white/30' />
                    </Skeleton>
                </PaginationItem>
                {new Array(10).fill(0).map((e) => (
                    <PaginationItem key={e}>
                        <Skeleton className='w-9 h-9' />
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <Skeleton>
                        <PaginationEllipsis className='stroke-white/30' />
                    </Skeleton>
                </PaginationItem>
                <PaginationItem>
                    <Skeleton>
                        <PaginationNext>Вперед</PaginationNext>
                    </Skeleton>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}

export {PaginationSkeleton};