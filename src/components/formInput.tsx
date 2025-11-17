import {cn} from "@/lib/utils.ts";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import type {FieldApi} from "@tanstack/react-form";

type TFormInputProps = {
    field: FieldApi<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>
    placeholder?: string
    type?: string
    label?: string
}

export function FormInput(
    {
        field,
        placeholder,
        type = 'text',
        label = undefined,
        ...props
    }: TFormInputProps) {
    return (
        <div className={cn('grid gap-2')}>
            {label && <Label htmlFor={field.name}>{label}</Label>}
            <Input
                id={field.name}
                name={field.name}
                type={type}
                value={field.state.value}
                placeholder={placeholder}
                onChange={(e) => field.handleChange(e.target.value)}
                {...props}
            />
            <p className={cn('text-sm text-destructive mb-4')}>
                {field.state.meta.errors.length > 0 && field.state.meta.errors[0].message}
            </p>

        </div>
    )
}