import {Item, ItemActions, ItemContent, ItemTitle} from "@/components/ui/item.tsx";
import {ExternalLinkIcon} from "lucide-react";
import {type ReactNode} from "react";
import {Link, useRouterState} from "@tanstack/react-router";
import {cn} from "@/shared/utils/cn.ts";

interface AdminNavigationItemProps {
  children: ReactNode | string,
  modelName: string
}

function AdminNavigationItem({children, modelName,}: AdminNavigationItemProps) {
  const handleClick = (name: string) => {
    localStorage.setItem('selectedAdminTable', `/${name}`)
  }
  const currentPath = useRouterState({
    select: state => state.location.pathname
  })

  return (
    <Item asChild variant={'outline'}
      className={cn(
        'mb-3 px-4 py-1.5',
        currentPath === '/admin/' + modelName ? 'bg-accent' : ''
      )}
    >
      <Link
        to={'/admin/' + modelName}
        onClick={() => handleClick(modelName)}>
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
