import {useTheme} from "@/components/themeProvider.tsx";
import {cn} from "@/lib/utils.ts";

function AboutPage() {
    const {setTheme} = useTheme()

    return (
        <div className={cn('flex container p-5')}>
            <button onClick={() => setTheme('system')}>system</button>
            <button onClick={() => setTheme('dark')}>dark</button>
            <button onClick={() => setTheme('light')}>light</button>
        </div>
    );
}

export {AboutPage};