import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {cn} from "@/shared/utils/cn.ts";
import {UserLogin} from "@/widgets/UserAuth/UserLogin.tsx";
import {UserRegister} from "@/widgets/UserAuth/UserRegister.tsx";

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
                        <UserRegister />
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    );
}

export {UserAuthManager};