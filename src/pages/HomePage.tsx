import {cn} from "@/lib/utils.ts";
import {useGetMe} from "@/hooks/useUserService.ts";

function HomePage() {
    const {isPending, error, data} = useGetMe()

    if (isPending) {
        return <div>Загрузка...</div>
    }

    if (error) {
        console.log(error)
        return <div>Ошибка</div>
    }

    if(data){
        console.log(data.data)
    }

    return (
        <div className={cn('flex container p-5')}>
            qweqweqwe
        </div>
    );
}

export {HomePage};