import {Button} from "@/components/ui/button.tsx";
import {Item, ItemActions, ItemContent, ItemTitle} from "@/components/ui/item.tsx";
import {ExternalLinkIcon} from "lucide-react";
import type {ReactNode} from "react";

interface AdminNavigationItemProps {
    children: ReactNode | string,
    modelName: string
    setActiveModel: (modelName: string) => void
}

function AdminNavigationItem({children, modelName, setActiveModel}: AdminNavigationItemProps) {
    return (
        <Item asChild variant={'outline'}>
            <Button
                className={'flex flex-row w-full h-fit mb-2'}
                variant={'ghost'}
                onClick={() => setActiveModel(modelName)}
            >
                <ItemContent>
                    <ItemTitle className={'text-lg'}>
                        {children}
                    </ItemTitle>
                </ItemContent>
                <ItemActions>
                    <ExternalLinkIcon className={'size-4'} />
                </ItemActions>
            </Button>
        </Item>
    );
}

export {AdminNavigationItem};
