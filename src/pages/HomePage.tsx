import {cn} from "@/lib/utils.ts";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";

function HomePage() {
    const result = useQuery({
        queryKey: ['users'],
        queryFn: () => axios.get(import.meta.env.VITE_API_URL + '/categories', {
            params: {
                page: 1,
                limit: 10
            }
        })
    })

    if (result.isPending) {
        return <div>Загрузка...</div>
    }

    if (result.error) {
        console.log(result.error)
        return <div>Ошибка</div>
    }

    if(result.data){
        console.log(result.data.data)
    }

    return (
        <div className={cn('flex container p-5')}>
            qweqweqwe
        </div>
    );
}

export {HomePage};