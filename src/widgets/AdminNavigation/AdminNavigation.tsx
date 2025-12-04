import {cn} from "@/shared/utils/cn.ts";
import {ItemGroup} from "@/components/ui/item.tsx";
import {AdminNavigationItem} from "@/widgets/AdminNavigation/AdminNavigationItem.tsx";

interface AdminNavigationProps {
    setActiveModel: (modelName: string) => void
}

const modelTitles = {
    users: 'Пользователи',
    products: 'Товары',
    categories: 'Категории'
}

function AdminNavigation({setActiveModel}: AdminNavigationProps) {
    return (
        <ItemGroup className={cn('pt-[120px] flex-col flex m-3 fixed left-0 top-0 h-screen w-fit',
            'border-r-1 border-r-white/10 pr-5'
        )}>
            {Object.entries(modelTitles).map(([key, value]) => <AdminNavigationItem
                setActiveModel={setActiveModel}
                modelName={key}
                key={key}
            >{value}</AdminNavigationItem>)}
        </ItemGroup>
    );
}

export {AdminNavigation};