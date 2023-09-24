import CreateUserForm from "@/components/form/CreateUserForm"
import { PageWrapper } from "@/components/PageWrapper"

const page = () => {
    return <PageWrapper>
        <div>
        <p className="text-3xl text-center pb-4">สร้างบัญชีผู้ใช้</p>
        <CreateUserForm />
        </div>
        </PageWrapper>
}

export default page;