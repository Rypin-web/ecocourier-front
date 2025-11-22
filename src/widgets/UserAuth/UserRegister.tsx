import {useAppForm} from "@/shared/hooks/useAppForm.ts";
import {useRegister} from "@/shared/hooks/useUserService.ts";
import z from "zod";
import {useEffect} from "react";
import {toast} from "sonner";

const schema = z.object({
    first_name: z.string().min(2).max(128),
    last_name: z.string().optional(),
    phone: z.string().min(8).max(128).regex(z.regexes.e164, 'Invalid phone'),
    email: z.string().min(6).max(128).regex(z.regexes.email, 'Invalid email'),
    password: z.string().min(6).max(128),
})

type FormDefValues = z.infer<typeof schema>

function UserRegister() {
    const {mutate, isPending, data, error} = useRegister()
    const form = useAppForm({
        defaultValues: {
            first_name: '',
            last_name: '',
            phone: '',
            email: '',
            password: '',
        } as FormDefValues,
        validators: {
            onChange: schema
        },
        onSubmit: ({value}) => {
            mutate({data: value})
        }
    })

    useEffect(() => {
        if (data?.data.data.user.first_name) toast.success(`${data.data.data.user.first_name} зарегистрирован`)
        if (error?.message) toast.error(error?.message)

        form.setFieldValue('first_name', '')
        form.setFieldValue('last_name', '')
        form.setFieldValue('phone', '')
        form.setFieldValue('email', '')
        form.setFieldValue('password', '')
    }, [data, isPending, error])

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                form.handleSubmit()
            }}
        >
            <form.AppField
                name={"first_name"}
                children={(field) => (
                    <field.FormInput
                        field={field}
                        label='Имя'
                        placeholder='Имя...'
                        type='text'
                    />
                )}
            />
            <form.AppField name={'last_name'}
                children={(field) => (
                    <field.FormInput
                        field={field}
                        label='Фамилия'
                        placeholder='Фамилия...'
                        type='text'
                    />
                )}
            />
            <form.AppField name={'phone'}
                children={(field) => (
                    <field.FormInput
                        field={field}
                        label='Телефон'
                        placeholder='Телефон...'
                        type='text'
                    />
                )}
            />
            <form.AppField name={'email'}
                children={(field) => (
                    <field.FormInput
                        field={field}
                        label='Email'
                        placeholder='Email...'
                        type='email'
                    />
                )}
            />
            <form.AppField name={'password'}
                children={(field) => (
                    <field.FormInput
                        field={field}
                        label='Пароль'
                        placeholder='Пароль...'
                        type='password'
                    />
                )}
            />
            <form.AppForm>
                <form.SubmitButton
                    text={'Зарегистрироваться'}
                    isPending={isPending}
                />
            </form.AppForm>
        </form>
    );
}

export {UserRegister};