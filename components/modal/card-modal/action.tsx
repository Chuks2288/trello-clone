"use client";

import { Check, Copy, Trash } from "lucide-react";
import { useState } from "react";

import { useAction } from "@/hooks/useAction";
import { deleteCard } from "@/app/actions/delete-card";
import { copyCard } from "@/app/actions/copy-card";
import { CardWithList } from "@/types";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useCardModal } from "@/hooks/useCardModal";


interface ActionProps {
    data: CardWithList
}

export const Actions = ({
    data
}: ActionProps) => {
    const params = useParams();
    const { onClose } = useCardModal();

    const {
        execute: executeCopyCard,
        isLoading: isLoadingCopy,
    } = useAction(copyCard, {
        onSuccess: (data) => {
            toast.success(`Card "${data.title}" copied`);
            onClose();
        },
        onError: (error) => {
            toast.error(error);
        }
    });

    const {
        execute: executeDeleteCard,
        isLoading: isLoadingDelete,
    } = useAction(deleteCard, {
        onSuccess: (data) => {
            toast.success(`Card "${data.title}" deleted`);
            onClose();
        },
        onError: (error) => {
            toast.error(error);
        }
    });


    const onCopy = () => {
        const boardId = params.boardId as string;

        executeCopyCard({
            id: data.id,
            boardId,
        })
    }

    const onDelete = () => {
        const boardId = params.boardId as string;

        executeDeleteCard({
            id: data.id,
            boardId,
        })
    }

    return (
        <div className="space-y-2 mt-2">
            <p className="text-xs font-semibold">
                Actions
            </p>
            <Button
                variant="gray"
                className="w-full justify-start"
                size="inline"
                onClick={onCopy}
                disabled={isLoadingCopy}
            >
                <Copy className="h-4 w-4 mr-2" />
                Copy
            </Button>
            <Button
                variant="gray"
                className="w-full justify-start"
                size="inline"
                onClick={onDelete}
                disabled={isLoadingDelete}
            >
                <Trash className="h-4 w-4 mr-2" />
                Delete
            </Button>
        </div>
    )
}

Actions.Skeleton = function functionSkeleton() {
    return (
        <div className="space-y-2 mt-2">
            <Skeleton className="w-20 h-4 bg-neutral-200" />
            <Skeleton className="w-full h-8 bg-neutral-200" />
            <Skeleton className="w-full h-8 bg-neutral-200" />
        </div>
    )
}