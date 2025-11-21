import {Button} from "@/components/ui/button.tsx";
import {Spinner} from "@/components/ui/spinner.tsx";
import {cn} from "@/shared/utils/cn.ts";


type TSubmitButtonProps = {
    text: string
    isPending: boolean
}

export function SubmitButton({text, isPending}: TSubmitButtonProps) {
    return (
        <Button className={cn('flex w-full')} disabled={isPending} type={'submit'}>
            {text} {isPending && <Spinner />}
        </Button>
    )
}