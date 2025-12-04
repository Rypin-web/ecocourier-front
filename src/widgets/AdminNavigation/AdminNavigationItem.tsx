import {Item, ItemActions, ItemContent, ItemTitle} from "@/components/ui/item.tsx";
import {ExternalLinkIcon} from "lucide-react";
import type {ReactNode} from "react";
import {Link} from "@tanstack/react-router";

interface AdminNavigationItemProps {
    children: ReactNode | string,
    modelName: string
}

function AdminNavigationItem({children, modelName,}: AdminNavigationItemProps) {
    return (
        <Item asChild variant={'outline'} className={'mb-3'}>
            <Link to={'/admin/' + modelName}>
                <ItemContent>
                    <ItemTitle className={'text-lg'}>
                        {children}
                    </ItemTitle>
                </ItemContent>
                <ItemActions>
                    <ExternalLinkIcon className={'size-4'} />
                </ItemActions>
            </Link>
        </Item>
    );
}

export {AdminNavigationItem};
