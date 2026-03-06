import type {FieldApi} from "@tanstack/react-form";
import {Label} from "@/components/ui/label.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {useDebounce} from "@/shared/hooks/useDebounce.ts";
import {useQuery} from "@tanstack/react-query";
import {Command, CommandEmpty, CommandInput, CommandItem, CommandList} from "@/components/ui/command.tsx";
import {Check} from "lucide-react";
import {cn} from "@/shared/utils/cn.ts";
import type {AxiosResponse} from "axios";
import type {TApiDefResponse} from "@/shared/utils/apiService.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";

interface Entity {
  data: {
    total: number
    data: {
      id: string
      name: string
    }[]
  }
}

interface FormSelectProps<T extends Entity> {
  field: FieldApi<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>
  fetchEntities: (search: string) => Promise<AxiosResponse<TApiDefResponse<T>>>
  placeholder?: string
  label?: string
}

function FormSelect<T extends Entity>({field, fetchEntities, placeholder, label}: FormSelectProps<T>) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 250)
  const {data, isLoading} = useQuery({
    queryKey: ['FORM_SELECT_ENTITY', debouncedSearch],
    queryFn: async () => await fetchEntities(debouncedSearch)
  })

  console.log(data)

  return (
    <div className='grid gap-2'>
      {label && <Label htmlFor={field.name}>{label}</Label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            role={"combobox"}
            aria-expanded={open}
            className='w-full justify-between'
          >
            {field.state.value && !!data
              ? data?.data.data.data.find(item => item.id === field.state.value)?.name
              : placeholder && 'Выберите...'
            }
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Command>
            <CommandInput
              placeholder={placeholder}
              value={search}
              onValueChange={setSearch}
            />
            <CommandList className='max-h-[420px] overflow-y-scroll'>
              {!isLoading && <CommandEmpty>Ничего не найдено</CommandEmpty>}
              {isLoading
                ? (
                  new Array(10).fill(0).map(() => (
                    <Skeleton className='h-6 w-full mt-1'/>
                  ))
                )
                : (data?.data.data.data.map((e) => (
                  <CommandItem className='mt-1' key={e.id} value={e.name} onSelect={() => {
                    field.handleChange(e.id)
                    setOpen(false)
                  }}>
                    {e.name}
                    <Check
                      className={cn(
                        "ml-auto",
                        e.id === field.state.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                )))
              }
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export {FormSelect};