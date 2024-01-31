import OrgControl from "./_components/org-control"


const OrganizationIdlayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <>
            <OrgControl />
            {children}
        </>
    )
}

export default OrganizationIdlayout