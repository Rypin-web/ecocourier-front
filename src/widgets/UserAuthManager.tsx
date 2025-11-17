import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {cn} from "@/lib/utils.ts";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useUserContext} from "@/shared/providers/userProvider.tsx";
import {useLogin} from "@/hooks/useUserService.ts";
import {useAppForm} from "@/hooks/useAppForm.ts";
import {z} from "zod";
import {toast} from "sonner";
import {useEffect} from "react";

function UserAuthManager() {
    const userContext = useUserContext()
    const {mutate, isPending, data, error} = useLogin()
    const form = useAppForm({
        defaultValues: {
            email: '',
            password: ''
        },
        validators: {
            onChange: z.object({
                email: z.string().regex(z.regexes.email).min(6).max(128),
                password: z.string().min(6).max(128)
            })
        },
        onSubmit: ({value}) => {
            mutate(value)
        }
    })

    useEffect(()=> {
        if (error) {
            console.log('@@@', error)
            toast(error.message)
        }

        if (data) {
            userContext.setUser(data.data.data.user)
            toast('Успешно авторизован')
        }
    }, [error, data])

    return (
        <Tabs defaultValue={'login'} className={cn('m-5')}>
            <TabsList>
                <TabsTrigger value={'login'}>Войти</TabsTrigger>
                <TabsTrigger value={'register'}>Регистрация</TabsTrigger>
            </TabsList>
            <TabsContent value={'login'}>
                <Card className={cn('mt-4')}>
                    <CardHeader>
                        <CardTitle>Войти в аккаунт</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault()
                                form.handleSubmit()
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
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value={'register'}>
                <Card>
                    <CardHeader>
                        <CardTitle>Регистрация</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className={cn('flex flex-col gap-6')}>
                                <div className={cn('grid gap-2')}>
                                    <Label htmlFor={'firstName'}>
                                        Имя
                                    </Label>
                                    <Input type={"text"} placeholder={'Имя...'} id={'firstName'} required />
                                </div>
                                <div className={cn('grid gap-2')}>
                                    <Label htmlFor={'lastName'}>
                                        Фамилия
                                    </Label>
                                    <Input type={"text"} placeholder={'Фамилия...'} id={'lastName'} required />
                                </div>
                                <div className={cn('grid gap-2')}>
                                    <Label htmlFor={'phone'}>
                                        Номер
                                    </Label>
                                    <Input type={"text"} placeholder={'Номер...'} id={'phone'} required />
                                </div>
                                <div className={cn('grid gap-2')}>
                                    <Label htmlFor={'email'}>
                                        Email
                                    </Label>
                                    <Input type={"email"} placeholder={'Email...'} id={'email'} required />
                                </div>
                                <div className={cn('grid gap-2')}>
                                    <Label htmlFor={'password'}>
                                        Пароль
                                    </Label>
                                    <Input type={"password"} placeholder={'Пароль...'} id={'password'} required />
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter>
                        <Button>Зарегистрироваться</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    );
}

export {UserAuthManager};