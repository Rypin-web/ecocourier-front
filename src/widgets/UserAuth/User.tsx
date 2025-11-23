import {Item, ItemContent} from "@/components/ui/item.tsx";
import {cn} from "@/shared/utils/cn.ts";
import {Button} from "@/components/ui/button.tsx";
import {UserAuthManager} from "@/widgets/UserAuth/UserAuthManager.tsx";
import {useUserContext} from "@/shared/providers/userProvider.tsx";
import {SheetHeader, SheetTitle} from "@/components/ui/sheet.tsx";
import {useLogout} from "@/shared/hooks/useUserService.ts";
import {useEffect, useState} from "react";
import {useNavigate} from "@tanstack/react-router";
import {Spinner} from "@/components/ui/spinner.tsx";

function User() {
    const {user, setUser, setBasket} = useUserContext()
    const {mutate, isPending, isSuccess} = useLogout()
    const navigate = useNavigate()
    const [emulateUpdateUserData, setEmulateUpdateUserData] = useState(false)

    useEffect(() => {
        if (isSuccess) {
            setUser(null)
            setBasket([])
            localStorage.removeItem('token')
            navigate({to: '/'})
        }
    }, [isPending, isSuccess])

    return (
        <>
            <SheetHeader>
                <SheetTitle>
                    {user?.email && `(${user.role === 'courier' ? 'Курьер' : 'Клиент'})`}
                    {!user?.email && 'Авторизация'}
                </SheetTitle>
            </SheetHeader>
            {user?.email && <Item>
              <ItemContent className={cn('flex-col flex gap-3 text-lg')}>
                <h2>{user.first_name}</h2>
                <h2>{user.last_name}</h2>
                <h2>Почта: {user.email}</h2>
                <h2 className={cn('mb-5')}>Телефон: {user.phone}</h2>
                <Button disabled={emulateUpdateUserData} onClick={() => setEmulateUpdateUserData(true)}>
                  Изменить {emulateUpdateUserData && <Spinner />}
                </Button>
                <Button variant={"secondary"} disabled={isPending} onClick={() => mutate()}>
                  Выйти
                </Button>
              </ItemContent>
            </Item>}
            {!user?.email && <UserAuthManager />}
        </>
    );
}

export {User};