import {Button} from "@/components/ui/button.tsx";
import {Spinner} from "@/components/ui/spinner.tsx";
import {cn} from "@/shared/utils/cn.ts";


type TSubmitButtonProps = {
    text: string
    isPending: boolean
    className?: string
}

export function SubmitButton({text, isPending, className}: TSubmitButtonProps) {
    return (
        <Button className={className ? className : cn('flex w-full')} disabled={isPending} type={'submit'}>
            {text} {isPending && <Spinner />}
        </Button>
    )
}