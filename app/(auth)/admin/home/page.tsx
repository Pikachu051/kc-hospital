import { authOptions } from "@/lib/auth"; 
import { getServerSession } from "next-auth";
import Link from "next/link";
import { PageWrapper } from "@/components/PageWrapper";

const page = async () => {
    const session = await getServerSession(authOptions);
    if (session?.user.role !== 'ADMIN'){
        return <PageWrapper><div><strong className="text-2xl text-red-600">คุณไม่มีสิทธิ์ในการเข้าถึงข้อมูลส่วนนี้</strong><br/>หากคุณมั่นใจว่านี่คือข้อผิดพลาดกรุณาติดต่อฝ่าย <Link className="pt-1 text-blue-400 hover:text-black hover:transition-all" href="/itsupport">IT Support</Link></div></PageWrapper>;
    }

    return <div>ยินดีต้อนรับ คุณ {session?.user.firstName} สู่หน้าผู้ดูแลระบบ</div>;
};
export default page;