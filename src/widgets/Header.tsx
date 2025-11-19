import {cn} from "@/lib/utils.ts";
import {Link} from "@tanstack/react-router";
import {Package2, ShoppingCart, UserRound} from "lucide-react";
import {Item, ItemActions, ItemContent} from "@/components/ui/item.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet.tsx";
import {BurgerWrapper} from "@/shared/ui/burgerWrapper.tsx";
import {UserAuthManager} from "@/widgets/UserAuth/UserAuthManager.tsx";
import {ThemeSelector} from "@/features/ThemeSelector.tsx";
import {Navigation} from "@/shared/ui/Navigation.tsx";

//TODO: Переписать это дерьмо. Локация не нужна и чета нужно придумать с корзиной.
//TODO: Мб она должна быть в правой части страницы, когда с продуктами. Или чет другое
//TODO: И еще добавить ссылки на дерьмо типа "О нас"
export function Header() {

    return (
        <header className={cn('sticky top-0 z-50 w-full px-1 md:px-10 py-3 shadow-sm flex items-center gap-1',
            ' md:gap-10')}>
            <Link to={'/'}>
                <Package2 className={cn('size-10 stroke-sidebar-primary hover:stroke-primary transition-colors')} />
            </Link>
            <Item variant={'default'} className={cn('flex-grow  transition-all duration-300')}>
                <ItemContent className={cn('flex-row items-center gap-0 relative w-full')}>
                    <ItemContent className={cn('w-full')}>
                        <Input
                            type={'text'}
                            placeholder={'Поиск..'}
                            className={cn('h-11 w-full min-w-[200px] pr-24')}
                        />
                    </ItemContent>
                    <ItemActions>
                        <Button
                            variant={'secondary'}
                            className={cn('absolute right-1 top-1')}
                            onClick={() => alert('foo')}
                        >
                            Искать
                        </Button>
                    </ItemActions>
                </ItemContent>
            </Item>
            <BurgerWrapper>
                <Navigation />
                <div className={cn('flex flex-row justify-center items-center md:gap-5 lg:gap-15')}>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                size={"icon"}
                                variant={'ghost'}
                                className={cn('group p-5')}
                            >
                                <UserRound className={cn('size-8 transition-all duration-300',
                                    'group-hover:stroke-sidebar-primary'
                                )} />
                            </Button>
                        </SheetTrigger>
                        <SheetContent className={cn(
                            window.innerWidth < 468 ? `min-w-[100%]` : `min-w-[400px]`
                        )}>
                            <SheetHeader>
                                <SheetTitle>User</SheetTitle>
                            </SheetHeader>
                            <UserAuthManager />
                            <SheetFooter>
                                <SheetClose asChild>
                                    <Button variant={'secondary'}>Close</Button>
                                </SheetClose>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                    <ThemeSelector />
                    <Link to={'/'}>
                        <ShoppingCart className={cn('size-8 hover:stroke-sidebar-primary transition-colors')} />
                    </Link>
                </div>
            </BurgerWrapper>
        </header>
    );
}