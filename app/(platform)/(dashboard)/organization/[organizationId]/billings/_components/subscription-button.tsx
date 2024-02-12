"use client";

import { toast } from "sonner";

import { stripeRedirect } from "@/app/actions/stripe-redirect";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/useAction";
import { useProModal } from "@/hooks/use-pro-modal";


interface SubscriptionButtonProps {
    isPro: boolean;
}

export const SubscriptionButton = ({
    isPro
}: SubscriptionButtonProps) => {
    const { onOpen } = useProModal();

    const { execute, isLoading } = useAction(stripeRedirect, {
        onSuccess: (data) => {
            window.location.href = data as string;
        },
        onError: (error) => {
            toast.error(error);
        }
    });

    const onClick = () => {
        if (isPro) {
            execute({});
        } else {
            onOpen();
        }
    }

    return (
        <Button
            onClick={onClick}
            variant="primary"
            disabled={isLoading}
        >
            {isPro ? "Manage subscription" : "Upgrade to pro"}
        </Button>
    )
}

