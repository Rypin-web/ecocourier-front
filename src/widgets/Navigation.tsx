import {Item, ItemContent} from "@/components/ui/item.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "@tanstack/react-router";
import {cn} from "@/shared/utils/cn.ts";

function Navigation() {
    return (
        <Item variant={'default'}>
            <ItemContent
                className={window.innerWidth > 937
                    ? cn('flex flex-row justify-center ml-[-4rem] mr-[-3rem]')
                    : cn('flex flex-row justify-center')
                }
            >
                <Button asChild variant={'link'} className={cn('text-chart-2')}>
                    <Link to={'/about'}  className={cn('text-[1.2rem] font-bold')}>
                        О нас
                    </Link>
                </Button>
                <Button asChild variant={'link'} className={cn('text-chart-2')}>
                    <Link to={'/about'} className={cn('text-[1.2rem] font-bold')}>
                        Партнеры
                    </Link>
                </Button>
                <Button asChild variant={'link'} className={cn('text-chart-2')}>
                    <Link to={'/about'}  className={cn('text-[1.2rem] font-bold')}>
                        Новости
                    </Link>
                </Button>
            </ItemContent>
        </Item>
    );
}

export {Navigation};