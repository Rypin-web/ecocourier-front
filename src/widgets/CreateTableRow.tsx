import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import type {UseMutateFunction} from "@tanstack/react-query";
import type {AxiosResponse} from "axios";
import type {TApiDefResponse} from "@/shared/utils/apiService.ts";

interface CreateUserProps {
    isOpen: boolean
    toggleOpen: () => void
    fields: string[]
    createMutate: UseMutateFunction<AxiosResponse<TApiDefResponse<any>, any, {}>, Error, any, unknown>
}

function CreateTableRow({isOpen, toggleOpen, fields, createMutate}: CreateUserProps) {
    return (
        <Dialog open={isOpen} onOpenChange={toggleOpen}>
            <DialogTrigger>
                <Button onClick={toggleOpen} variant={'outline'}>Создать</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create</DialogTitle>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

export {CreateTableRow};