import {createFormHook, createFormHookContexts} from "@tanstack/react-form";
import {FormInput} from "@/shared/ui/FormInput.tsx";
import {SubmitButton} from "@/shared/ui/SubmitButton.tsx";
import {FormDnd} from "@/shared/ui/FormDnd.tsx";
import {FormSelect} from "@/shared/ui/FormSelect.tsx";
import {FormTextArea} from "@/shared/ui/FormTextArea.tsx";

const {fieldContext, formContext} = createFormHookContexts()

export const {useAppForm} = createFormHook({
    fieldComponents: {
        FormInput,
        FormDnd: FormDnd,
        FormSelect: FormSelect,
        FormTextArea: FormTextArea
    },
    formComponents: {
        SubmitButton
    },
    fieldContext,
    formContext
})