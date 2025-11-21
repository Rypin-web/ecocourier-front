import {useTheme} from "@/shared/ui/themeProvider.tsx";
import {cn} from "@/shared/utils/cn.ts";
import {Button} from "@/components/ui/button.tsx";

function AboutPage() {
    const {setTheme} = useTheme()

    return (
        <div className={cn('flex container p-5 gap-3 justify-center items-center')}>
            <Button variant={'default'} onClick={() => setTheme('system')}>system</Button>
            <Button variant={'link'} onClick={() => setTheme('dark')}>dark</Button>
            <Button variant={'ghost'} onClick={() => setTheme('light')}>light</Button>
        </div>
    );
}

export {AboutPage};