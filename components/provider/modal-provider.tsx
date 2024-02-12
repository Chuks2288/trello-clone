"use client";

import { useEffect, useState } from "react";

import { CardModal } from "@/components/modal/card-modal";
import { ProModal } from "@/components/modal/pro-modal";

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);


    if (!isMounted) {
        return null;
    }

    return (
        <>
            <CardModal />
            <ProModal />
        </>
    )
}

export default ModalProvider