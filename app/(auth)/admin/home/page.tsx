import { authOptions } from "@/lib/auth"; 
import { getServerSession } from "next-auth";
import Link from "next/link";
import { PageWrapper } from "@/components/PageWrapper";
import Image from 'next/image';
import logo from '@/public/inpatient.png';
import { buttonVariants } from "@/components/ui/button";

const page = async () => {
    const session = await getServerSession(authOptions);

    return <PageWrapper>
        <PageWrapper>
    <div className='relative h-[75vh] w-[100vh]'>
      <div className="relative top-0 left-24 mt-0 pb-[5vh]">
        <p className='text-2xl pt-5 relative left-[-10vh]'><strong className='text-3xl'>ระบบผู้ดูแลระบบ</strong><br></br>ยินดีต้อนรับ, คุณ {session?.user.firstName}</p>
      </div>
      <div className='flex justify-center pb-[10vh]'>
        <Image src={logo} alt='Inpatient logo' width={165} height={165} style={{maxWidth: '100%', height: 'auto',}}></Image>
      </div>
      <div className='justify-items-center grid gap-[8vem] grid-cols-3 grid-rows-1'>
        <Link href="/create-user" className={buttonVariants({variant: "destructive"})}>สร้างบัญชีผู้ใช้</Link>
        <Link href="/account-management" className={buttonVariants({variant: "destructive"})}>จัดการบัญชีผู้ใช้</Link>
        <Link href="/login-history" className={buttonVariants({variant: "destructive"})}>ประวัติการเข้าสู่ระบบ</Link>
      </div>
  </div>
  </PageWrapper>
        </PageWrapper>
};
export default page;