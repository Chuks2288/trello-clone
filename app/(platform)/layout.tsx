import { ClerkProvider } from "@clerk/nextjs";


const PlatformLayout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <ClerkProvider>
            <div className="">
                {children}
            </div>
        </ClerkProvider>
    )
}

export default PlatformLayout