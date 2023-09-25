import { PageWrapper } from "@/components/PageWrapper";
import Link from "next/link";

const page = () => {
    return <PageWrapper><div><strong className="text-2xl text-red-600">คุณไม่มีสิทธิ์ในการเข้าถึงข้อมูลส่วนนี้</strong><br/>หากคุณมั่นใจว่านี่คือข้อผิดพลาดกรุณาติดต่อฝ่าย <Link className="pt-1 text-blue-400 hover:text-black hover:transition-all" href="/itsupport">IT Support</Link></div></PageWrapper>;
}

export default page;