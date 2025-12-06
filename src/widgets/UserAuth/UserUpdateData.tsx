import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {useCallback, useEffect, useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {useUpdateUser} from "@/shared/hooks/useUserService.ts";
import {cn} from "@/shared/utils/cn.ts";
import {useAppForm} from "@/shared/hooks/useAppForm.ts";
import z from "zod";
import {toast} from "sonner";
import {useUserContext} from "@/shared/providers/userProvider.tsx";

const schema = z.object({
    first_name: z.string().min(2).max(128),
    last_name: z.string().optional(),
    phone: z.string().min(8).max(128).regex(z.regexes.e164, 'Invalid phone'),
    email: z.string().min(6).max(128).regex(z.regexes.email, 'Invalid email'),
})

type FormData = z.infer<typeof schema>

function UserUpdateData() {
    const [isOpen, setIsOpen] = useState(false)
    const {user, setUser} = useUserContext()
    const toggleOpen = useCallback(() => setIsOpen(!isOpen), [isOpen])
    const {mutate, isPending, data, error} = useUpdateUser()
    const form = useAppForm({
        defaultValues: {
            first_name: user?.first_name,
            last_name: user?.last_name || '',
            email: user?.email,
            phone: user?.phone
        } as FormData,
        validators: {
            onSubmit: schema
        },
        onSubmit: ({value}) => {
            mutate({data: value})
        },
    })

    useEffect(() => {
        if (error) {
            toast.error(error.message)
            return
        }

        if (data) {
            toast.success('Данные изменены')
            setUser(data.data.data.user)
            setIsOpen(false)
        }
    }, [data, error])

    return (
        <Dialog open={isOpen} onOpenChange={toggleOpen}>
            <DialogTrigger>
                <Button
                    disabled={isOpen}
                    onClick={toggleOpen}
                    className={cn('flex w-full')}
                >
                    Изменить
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Изменение данных</DialogTitle>
                </DialogHeader>
                <form
                    onSubmit={async (e) => {
                        e.preventDefault()
                        await form.handleSubmit()
                    }}
                >
                    <form.AppField name={'first_name'}
                        children={(field) =>
                            <field.FormInput field={field} label={'Имя'} placeholder={'Укажите имя'} type={'text'} />
                        }
                    />
                    <form.AppField name={'last_name'}
                        children={(field) =>
                            <field.FormInput field={field} label={'Фамилия'} placeholder={'Укажите фамилию'} type={'text'} />
                        }
                    />
                    <form.AppField name={'email'}
                        children={(field) =>
                            <field.FormInput field={field} label={'Почта'} placeholder={'Укажите почту'} type={'email'} />
                        }
                    />
                    <form.AppField name={'phone'}
                        children={(field) =>
                            <field.FormInput field={field} label={'Телефон'} placeholder={'Укажите телефон'} type={'phone'} />
                        }
                    />
                    <DialogFooter>
                        <Button type={'button'} variant={"secondary"} onClick={toggleOpen}>Отмена</Button>
                        <form.AppForm>
                            <form.SubmitButton
                                isPending={isPending}
                                text={'Изменить'}
                                className={'flex w-fit'}
                            />
                        </form.AppForm>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export {UserUpdateData};
