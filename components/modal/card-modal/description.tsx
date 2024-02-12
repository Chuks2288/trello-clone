"use client";

import { useState, useRef, ElementRef } from "react";
import { useParams } from "next/navigation";
import { AlignLeft } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

import { useAction } from "@/hooks/useAction";
import { updateCard } from "@/app/actions/update-card";

import { Skeleton } from "@/components/ui/skeleton";
import { CardWithList } from "@/types";
import { FormTextarea } from "@/components/form/form-textarea";
import { FormButton } from "@/components/form/form-button";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";



interface DescriptionProps {
    data: CardWithList;
}

export const Description = ({
    data
}: DescriptionProps) => {

    const queryClient = useQueryClient();
    const params = useParams();

    const [isEditing, setIsEditing] = useState(false);

    const formRef = useRef<ElementRef<"form">>(null);
    const textareaRef = useRef<ElementRef<"textarea">>(null);

    const enableEditing = () => {
        setIsEditing(true);

        setTimeout(() => {
            textareaRef.current?.focus();
        });
    }

    const disableEditing = () => {
        setIsEditing(false);
    }

    // const onBlur = () => {
    //     formRef.current?.requestSubmit();
    // }


    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "ESCAPE") {
            disableEditing();
        }
    };

    useEventListener("keydown", onKeyDown);
    useOnClickOutside(formRef, disableEditing);

    const { execute, fieldErrors } = useAction(updateCard, {
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["card", data.id],
            });

            queryClient.invalidateQueries({
                queryKey: ["card-logs", data.id]
            });
            toast.success(`Card "${data.title}" updated`);
            disableEditing();
        },
        onError: (error) => {
            toast.error(error);
        }
    })


    const onSubmit = (formData: FormData) => {
        const description = formData.get("description") as string;
        const boardId = params.boardId as string;

        execute({
            description,
            boardId,
            id: data.id,
        });
    }


    return (
        <div className="flex items-start gap-x-3 w-full">
            <AlignLeft className="h-5 w-5 mt-0.5 text-neutral-700" />
            <div className="w-full">
                <p className="font-semibold text-neutral-700 mb-2">
                    Description
                </p>
                {isEditing ? (
                    <form
                        action={onSubmit}
                        ref={formRef}
                        className="space-y-2"
                    >
                        <FormTextarea
                            ref={textareaRef}
                            id="description"
                            className="w-full mt-2"
                            placeholder="Add a more detailed description"
                            errors={fieldErrors}
                            defaultValue={data.description || undefined}
                        />
                        <div className="flex items-center gap-x-2">
                            <FormButton>
                                Save
                            </FormButton>
                            <Button
                                type="button"
                                onClick={disableEditing}
                                size="sm"
                                variant="ghost"
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                ) : (

                    <div
                        onClick={enableEditing}
                        role="button"
                        className="min-h-[78px] bg-neutral-200 text-sm font-medium py-3 px-3.5 rounded-md"
                    >
                        {data.description || "Add a more detailed description..."}
                    </div>
                )}
            </div>
        </div>
    )
}

Description.Skeleton = function DescriptionSkeleton() {
    return (
        <div className="flex items-start gap-x-3 w-full">
            <Skeleton className="h-6 w-6 bg-neutral-200" />
            <div className="w-full">
                <Skeleton className="h-6 w-24 mb-2 bg-neutral-200" />
                <Skeleton className="h-[78px] w-full mb-2 bg-neutral-200" />

            </div>
        </div>
    )
}