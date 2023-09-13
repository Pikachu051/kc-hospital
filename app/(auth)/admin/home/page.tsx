import { authOptions } from "@/lib/auth"; 
import { getServerSession } from "next-auth";

const page = async () => {
    const session = await getServerSession(authOptions);
    if (session?.user){
        return <div>ยินดีต้อนรับ คุณ {session?.user.firstName}สู่หน้าผู้ดูแลระบบ</div>;
    }

    return <h2 className="text-red-500">กรุณาเข้าสู่ระบบก่อน</h2>;
};
export default page;