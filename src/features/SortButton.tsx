import {Button} from "@/components/ui/button.tsx";
import {ArrowUpDown} from "lucide-react";

interface SortButtonProps<T> {
    set: (value: ((prev: T) => T) | T) => void
    type: 'ASC' | 'DESC'
}

function SortButton<T>({set, type}: SortButtonProps<T>) {
    return (
        <Button
            variant={type === 'ASC' ? 'ghost' : 'outline'}
            size={"icon"}
            onClick={() => set((prev) => {
                if (type === 'ASC') return {...prev, sort: 'DESC'}
                return {...prev, sort: 'ASC'}
            })}
        >
            <ArrowUpDown />
        </Button>
    );
}

export {SortButton};