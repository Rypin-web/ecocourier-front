import type {FieldApi} from "@tanstack/react-form";
import {cn} from "@/shared/utils/cn.ts";
import {Label} from "@/components/ui/label.tsx";
import {TypographyP} from "@/components/ui/typography.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";


type TFormInputProps = {
  field: FieldApi<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>
  placeholder?: string
  label?: string
}

export function FormTextArea(
  {
    field,
    placeholder,
    label = undefined,
    ...props
  }: TFormInputProps & React.ComponentProps<'textarea'>) {
  return (
    <div className={cn('grid gap-2', (field.state.meta.errors.length === 0) && 'mb-4')}>
      {label && <Label htmlFor={field.name}>{label}</Label>}
      <Textarea
        id={field.name}
        name={field.name}
        value={field.state.value}
        placeholder={placeholder}
        onChange={(e) => field.handleChange(e.target.value)}
        {...props}
      />
      {field.state.meta.errors.length > 0 && <TypographyP className={cn('text-sm text-destructive !mt-0 mb-4')}>
        {field.state.meta.errors[0].message}
      </TypographyP>}

    </div>
  )
}