import {createFormHook, createFormHookContexts} from "@tanstack/react-form";
import {FormInput} from "@/shared/ui/formInput.tsx";
import {SubmitButton} from "@/shared/ui/submitButton.tsx";
import {FormDnd} from "@/shared/ui/FormDnd.tsx";

const {fieldContext, formContext} = createFormHookContexts()

export const {useAppForm} = createFormHook({
    fieldComponents: {
        FormInput,
        FormDnd: FormDnd
    },
    formComponents: {
        SubmitButton
    },
    fieldContext,
    formContext
})