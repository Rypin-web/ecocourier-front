import {createFormHook, createFormHookContexts} from "@tanstack/react-form";
import {FormInput} from "@/components/formInput.tsx";
import {SubmitButton} from "@/components/submitButton.tsx";

const {fieldContext, formContext} = createFormHookContexts()

export const {useAppForm} = createFormHook({
    fieldComponents: {
        FormInput
    },
    formComponents: {
        SubmitButton
    },
    fieldContext,
    formContext
})