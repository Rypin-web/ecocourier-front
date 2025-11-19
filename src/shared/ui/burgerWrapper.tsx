import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet.tsx";
import {Button} from "@/components/ui/button.tsx";
import {cn} from "@/lib/utils.ts";
import {Menu} from "lucide-react";
import * as React from "react";

//TODO: Ссылки на страницы аля "О нас" и прочее дерьмо
function BurgerWrapper({children}: {children: React.ReactNode}) {
    const isMobile = window.innerWidth < 768

    return (
        <>
            {isMobile ? (
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            size={"icon"}
                            variant={'ghost'}
                            className={cn('group p-5')}
                        >
                            <Menu className={cn('size-8 transition-all duration-300',
                                'group-hover:stroke-sidebar-primary'
                            )} />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side={'top'} className={cn('flex justify-center gap-5')}>
                        <SheetHeader>
                            <SheetTitle>Menu</SheetTitle>
                        </SheetHeader>
                        <div className={cn('flex flex-row flex-wrap justify-center items-center gap-15')}>
                            {children}
                        </div>
                        <SheetFooter>
                            <SheetClose asChild>
                                <Button variant={'default'}>Close</Button>
                            </SheetClose>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            ) : children}
        </>

    );
}

export {BurgerWrapper};