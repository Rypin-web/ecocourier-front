import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {cn} from "@/shared/utils/cn.ts";
import {Palette} from "lucide-react";
import {useTheme} from "@/shared/ui/themeProvider.tsx";

function ThemeSelector() {
    const {setTheme} = useTheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    size={"icon"}
                    variant={'ghost'}
                    className={cn('group p-5')}
                >
                    <Palette
                        className={cn('size-8 transition-all duration-300 group-hover:stroke-sidebar-primary')}
                    />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel className={cn('text-center')}>Тема</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup>
                    <DropdownMenuRadioItem value='light' onClick={() => setTheme('light')}>Светлая</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value='dark' onClick={() => setTheme('dark')}>Темная</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export {ThemeSelector};