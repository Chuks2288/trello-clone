"use client";

import { useFormStatus } from "react-dom";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface FormButtonProps {
    children: React.ReactNode,
    disabled?: boolean;
    className?: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "primary";
}

export const FormButton = ({
    children,
    disabled,
    className,
    variant = "primary",
}: FormButtonProps) => {

    const { pending } = useFormStatus();

    return (
        <Button
            disabled={pending || disabled}
            type="submit"
            variant={variant}
            size="sm"
            className={cn(className)}
        >
            {/* {children} */}
            {
                pending ?
                    <Loader2 className="w-4 h-4 animate-spin" />
                    :
                    children
            }
        </Button>
    )
}