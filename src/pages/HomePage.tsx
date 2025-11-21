import {cn} from "@/shared/utils/cn.ts";
import {useUserContext} from "@/shared/providers/userProvider.tsx";

function HomePage() {
    const userContext = useUserContext()

    return (
        <div className={cn('flex container p-5')}>
            {userContext.user?.first_name}
        </div>
    );
}

export {HomePage};