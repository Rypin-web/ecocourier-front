import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {cn} from "@/shared/utils/cn.ts";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {UserLogin} from "@/widgets/UserAuth/UserLogin.tsx";

//TODO: Наваять логику, если пользователь авторизован и UI
function UserAuthManager() {


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
                        <UserLogin />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value={'register'}>
                <Card>
                    <CardHeader>
                        <CardTitle>Регистрация</CardTitle>
                    </CardHeader>
                    {/*//TODO: Переписать на TSF */}
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