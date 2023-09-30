import PatientTable from "@/components/table/PatientTable"
import { PageWrapper } from "@/components/PageWrapper"

const page = () => {
    return (
        <PageWrapper>
            <div className="w-full"><PatientTable/></div>
        </PageWrapper>
    )
}

export default page;