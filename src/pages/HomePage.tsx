import {cn} from "@/lib/utils.ts";
import {useLogin} from "@/hooks/useUserService.ts";
import {Button} from "@/components/ui/button.tsx";
import {useUserContext} from "@/shared/providers/userProvider.tsx";

function HomePage() {
    const userLogin = useLogin()
    const userContext = useUserContext()

    if(userLogin.data && userContext) {
        userContext.setUser(userLogin.data.data.data.user)
    }

    if(userContext?.user) {
        console.log(userContext.user)
    }

    return (
        <div className={cn('flex container p-5')}>
            qweqweqwe
            <Button onClick={() => userLogin.mutate({
                email: 'marlin@gmail.com',
                password: 'marlin1234'
            })}>
                ioquwioeqw
            </Button>
        </div>
    );
}

export {HomePage};