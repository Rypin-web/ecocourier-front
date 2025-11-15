import {createFileRoute} from "@tanstack/react-router";
import {useTheme} from "@/components/themeProvider.tsx";

export const Route = createFileRoute("/about")({
    component: () => {
        const {setTheme} = useTheme()

        return (
            <>
                <button onClick={() => setTheme('system')}>system</button>
                <button onClick={() => setTheme('dark')}>dark</button>
                <button onClick={() => setTheme('light')}>light</button>
            </>
        )
    }
})