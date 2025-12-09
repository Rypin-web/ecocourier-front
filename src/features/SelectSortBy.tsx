import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";

interface SelectSortByProps<T extends { sortBy: string }> {
    set: (value: ((prev: T) => T) | T) => void
    sortBy: T['sortBy']
    values: object
}

function SelectSortBy<T extends { sortBy: string }>(
    {set, sortBy, values}: SelectSortByProps<T>
) {
    return (
        <Select defaultValue={sortBy} onValueChange={(value) => set((prev) => ({
            ...prev, sortBy: value
        }))}>
            <SelectTrigger>
                <SelectValue placeholder='Сортировать по:' />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {Object.entries(values).map(([key, value]) => <SelectItem value={key} key={key}>
                        {value}
                    </SelectItem>)}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

export {SelectSortBy};