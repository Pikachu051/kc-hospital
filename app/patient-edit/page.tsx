import SignInForm from "@/components/form/PatientFinder";
import { PageWrapper } from "@/components/PageWrapper";

const page = () => {
    return (
        <PageWrapper>
        <div>
            <p className="text-3xl text-center">แก้ไขข้อมูลผู้ป่วย</p>
            <p className="opacity-90 text-center mt-3 mb-5">กรุณากรอกรหัสผู้ป่วยเพื่อดำเนินการต่อ</p>
            <div className="bg-stone-300 p-5 rounded-md"><SignInForm /></div>
        </div>
        </PageWrapper>
    );
}
export default page;