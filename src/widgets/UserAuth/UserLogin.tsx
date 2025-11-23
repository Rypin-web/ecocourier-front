import {useUserContext} from "@/shared/providers/userProvider";
import {useLogin} from "@/shared/hooks/useUserService";
import {useAppForm} from "@/shared/hooks/useAppForm";
import z from "zod";
import {useEffect} from "react";
import {toast} from "sonner";

function UserLogin() {
    const {setUser} = useUserContext()
    const {mutate, isPending, data, error} = useLogin()
    const form = useAppForm({
        defaultValues: {
            email: '',
            password: ''
        },
        validators: {
            onSubmit: z.object({
                email: z.string().regex(z.regexes.email, 'Неверный email').min(6).max(128),
                password: z.string().min(6).max(128)
            })
        },
        onSubmit: ({value}) => {
            mutate({data: value})
        }
    })

    useEffect(() => {
        if (error) toast.error(error.message)
        if (data) {
            setUser(data.data.data.user)
            localStorage.setItem('token', data.data.data.sessionToken)
            toast.success('Успешно авторизован')
            form.setFieldValue('email', '')
            form.setFieldValue('password', '')
        }
    }, [error, data])

    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault()
                await form.handleSubmit()
            }}
        >
            <form.AppField
                name={'email'}
                children={(field) =>
                    <field.FormInput
                        field={field}
                        label={'Ваш Email'}
                        placeholder={'Email...'}
                        type={'email'}
                    />}
            />
            <form.AppField
                name={'password'}
                children={(field) =>
                    <field.FormInput
                        field={field}
                        label={'Ваш пароль'}
                        placeholder={'Пароль...'}
                        type={'password'}
                    />}
            />
            <form.AppForm>
                <form.SubmitButton
                    text={'Войти'}
                    isPending={isPending}
                />
            </form.AppForm>
        </form>
    );
}

export {UserLogin};