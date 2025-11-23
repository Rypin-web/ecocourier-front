import {Item, ItemContent} from "@/components/ui/item.tsx";
import {cn} from "@/shared/utils/cn.ts";
import {Button} from "@/components/ui/button.tsx";
import {UserAuthManager} from "@/widgets/UserAuth/UserAuthManager.tsx";
import {useUserContext} from "@/shared/providers/userProvider.tsx";
import {SheetHeader, SheetTitle} from "@/components/ui/sheet.tsx";

function User() {
    const {user} = useUserContext()

    return (
        <>
            <SheetHeader>
                <SheetTitle>
                    {user?.first_name
                        ? `(${user.role === 'courier' ? 'Курьер' : 'Клиент'})`
                        : 'Авторизация'
                    }
                </SheetTitle>
            </SheetHeader>
            {
                user?.first_name
                    ? <Item>
                        <ItemContent className={cn('flex-col flex gap-3 text-lg')}>
                            <h2>{user.first_name}</h2>
                            <h2>{user.last_name}</h2>
                            <h2>Почта: {user.email}</h2>
                            <h2 className={cn('mb-5')}>Телефон: {user.phone}</h2>
                            <Button>
                                Изменить
                            </Button>
                            <Button variant={"secondary"}>
                                Выйти
                            </Button>
                        </ItemContent>
                    </Item>
                    : <UserAuthManager />
            }
        </>
    );
}

export {User};