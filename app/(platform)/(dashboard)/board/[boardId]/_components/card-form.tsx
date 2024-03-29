"use client";

import { Plus, X } from "lucide-react";
import {
    useRef,
    ElementRef,
    KeyboardEventHandler,
    forwardRef
} from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

import { useAction } from "@/hooks/useAction";
import { createCard } from "@/app/actions/create-card";
import { FormButton } from "@/components/form/form-button";
import { FormTextarea } from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface CardFormProps {
    listId: string;
    isEditing: boolean;
    enableEditing: () => void;
    disableEditing: () => void;
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(({
    listId,
    isEditing,
    enableEditing,
    disableEditing,
}, ref) => {
    const params = useParams();
    const formRef = useRef<ElementRef<"form">>(null);


    const { execute, fieldErrors } = useAction(createCard, {
        onSuccess: (data) => {
            toast.success(`card "${data.title}" created`);
            formRef.current?.reset();
        },
        onError: (error) => {
            toast.error(error);
        }
    })


    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            disableEditing();
        }
    };

    useOnClickOutside(formRef, disableEditing);
    useEventListener("keydown", onKeyDown);

    const onTextareakeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            formRef.current?.requestSubmit();
        }
    };

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;
        const listId = formData.get("listId") as string;
        // const boardId = formData.get("boardId") as string;
        const boardId = params.boardId as string;

        console.log({
            title,
            listId,
            boardId
        })

        execute({
            title,
            listId,
            boardId
        })
    }


    if (isEditing) {
        return (
            <form
                ref={formRef}
                action={onSubmit}
                className="m-1 py-0.5 px-1 space-y-4"
            >
                <FormTextarea
                    id="title"
                    onKeyDown={onTextareakeyDown}
                    ref={ref}
                    placeholder="Enter a title for this card..."
                    errors={fieldErrors}
                />
                <input
                    hidden
                    id="listId"
                    name="listId"
                    value={listId}
                />
                <div className="flex items-center gap-x-1">
                    <FormButton>
                        Add card
                    </FormButton>
                    <Button
                        onClick={disableEditing}
                        variant="ghost"
                        size="sm"
                    >
                        <X className="h-5 w-5" />
                    </Button>
                </div>
            </form>
        )
    }

    return (
        <div className="pt-2 px-2">
            <Button
                onClick={enableEditing}
                className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"
                size="sm"
                variant="ghost"
            >
                <Plus className="h-4 w-4 mr-2" />
                Add a card
            </Button>
        </div>
    )
});

CardForm.displayName = "CardForm";

