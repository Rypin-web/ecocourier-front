import {cn} from "@/shared/utils/cn.ts";
import {Item, ItemActions, ItemContent, ItemGroup, ItemTitle} from "@/components/ui/item.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ExternalLinkIcon} from "lucide-react";

interface AdminNavigationProps {
    setActiveModel: (modelName: string) => void
}

function AdminNavigation({setActiveModel}: AdminNavigationProps) {
    return (
        <ItemGroup className={cn('pt-[120px] flex-col flex m-3 fixed left-0 top-0 h-screen w-fit',
                'border-r-1 border-r-white/10 pr-5'
            )}>
            <Item asChild variant={'outline'}>
                <Button
                    className={'flex flex-row w-fit h-fit'}
                    variant={'ghost'}
                    onClick={() => setActiveModel('users')}
                >
                    <ItemContent>
                        <ItemTitle>
                            Пользователи
                        </ItemTitle>
                    </ItemContent>
                    <ItemActions>
                        <ExternalLinkIcon className={'size-4'} />
                    </ItemActions>
                </Button>
            </Item>
        </ItemGroup>
    );
}

export {AdminNavigation};