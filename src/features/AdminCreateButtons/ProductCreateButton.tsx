import type {QueryObserverResult, RefetchOptions, UseMutateFunction} from "@tanstack/react-query";
import type {AxiosResponse} from "axios";
import type {TCreateProductRequest, TGetProductsResponse} from "@/shared/types/apiUserServices.t.ts";
import {apiService, type TApiDefResponse} from "@/shared/utils/apiService.ts";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger} from "@/components/ui/dialog.tsx";
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {useAppForm} from "@/shared/hooks/useAppForm.ts";
import z from "zod";
import {toast} from "sonner";

interface ProductCreateButtonProps {
  isPending: boolean
  isError: boolean
  isSuccess: boolean
  mutate: UseMutateFunction<AxiosResponse<any, any, {}>, Error, TCreateProductRequest, unknown>
  reset: () => void
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<AxiosResponse<TApiDefResponse<TGetProductsResponse>, any, {}>, Error>>
}

const defaultValues = {
  title: '',
  description: '',
  price: 0,
  category_id: '',
  image: ''
}

const schema = z.object({
  title: z.string().max(128),
  description: z.string().max(2000).optional(),
  price: z.transform(Number).pipe(z.number().min(0)),
  category_id: z.uuidv4(),
  image: z.union([z.string(), z.file()])
})

type TFormDefValues = z.infer<typeof schema>

function ProductCreateButton({isPending, isSuccess, isError, mutate, reset, refetch}: ProductCreateButtonProps) {
  const [isOpen, setOpen] = useState(false)
  const form = useAppForm({
    defaultValues: defaultValues as TFormDefValues,
    validators: {
      onSubmit: schema
    },
    onSubmit: ({value}) => {
      const formData = new FormData()
      formData.append('title', value.title)
      formData.append('price', value.price.toString())
      if(value.description) formData.append('description', value.description)
      formData.append('category_id', value.category_id)
      if (value.image instanceof File) {
        const imageFile = new File([value.image], 'image.' + value.image.type.split('/').pop(), {
          type: value.image.type
        })
        formData.append('image', imageFile)
      }

      mutate(formData as unknown as TCreateProductRequest)
    },
  })

  useEffect(() => {
    if(isError && isOpen) toast.error('Не удалось создать')
    if(!isError && isSuccess) {
      toast.success(`Успешно создано!`)
      form.reset()
      reset()
      refetch()
      setOpen(false)
    }
  }, [isPending, isError, isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={setOpen} defaultOpen={false}>
      <DialogTrigger asChild>
        <Button>
          Создать +
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          Создать продукт
        </DialogHeader>
        <form
          className='overflow-y-scroll max-h-[700px] pr-4'
          onSubmit={async (e) => {
            e.preventDefault()
            await form.handleSubmit()
          }}
        >
          <form.AppField name={'title'} children={(field) =>
            <field.FormInput
              field={field} label={'Заголовок'} placeholder={'Введите название...'}
            />
          }
          />
          <form.AppField name={'price'} children={(field) =>
            <field.FormInput
              field={field} label={'Цена'} placeholder={'Введите цену...'}
            />
          }
          />
          <form.AppField name={'description'} children={(field) =>
            <field.FormTextArea
              field={field} label={'Описание'} placeholder={'Введите описание...'} maxLength={2000}
            />
          }
          />
          <form.AppField name={'category_id'} children={(field) =>
            <field.FormSelect
              field={field}
              label={'Категория'} placeholder={'Введите категорию...'}
              fetchEntities={(search) => apiService.get('/categories/', {
                params: {
                  q: search,
                  limit: 100,
                  page: 1
                }
              })}
            />
          } />
          <form.AppField name={'image'} children={(field) => (
            <field.FormDnd field={field} image={'Unset'} />
          )} />

          <DialogFooter>
            <Button variant={'secondary'} disabled={isPending} onClick={() => setOpen(false)}>
              Отмена
            </Button>
            <form.AppForm>
              <form.SubmitButton
                isPending={isPending}
                text={'Создать'}
                className={'flex w-fit'}
              />
            </form.AppForm>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export {ProductCreateButton}