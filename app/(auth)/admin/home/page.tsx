import { authOptions } from "@/lib/auth"; 
import { getServerSession } from "next-auth";
import Link from "next/link";
import { PageWrapper } from "@/components/PageWrapper";
import Image from 'next/image';
import logo from '@/public/admin.png';
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const page = async () => {
    const session = await getServerSession(authOptions);
    const accounts = await prisma.user.count();
    const recentAccount = await prisma.user.findFirst({
      orderBy: {
        id: 'desc'
      }
    });
    return<PageWrapper>
    <div className='relative h-[75vh] w-[100vh]'>
      <div className="relative top-0 left-24 mt-0 pb-[5vh]">
        <p className='text-2xl pt-5 relative left-[-10vh]'><strong className='text-3xl'>ระบบผู้ดูแลระบบ</strong><br></br>ยินดีต้อนรับ, คุณ {session?.user.firstName}</p>
      </div>
      <div className='flex justify-center pb-[10vh]'>
        <Image src={logo} alt='Inpatient logo' width={165} height={165} style={{maxWidth: '100%', height: 'auto',}}></Image>
      </div>
      <div className='justify-items-center grid gap-[8vem] grid-cols-3 grid-rows-1'>
        <Link href="/admin/create-user" className={buttonVariants({variant: "destructive"})}>สร้างบัญชีผู้ใช้</Link>
        <Link href="/admin/account-management" className={buttonVariants({variant: "destructive"})}>จัดการบัญชีผู้ใช้</Link>
        <Link href="/admin/login-history" className={buttonVariants({variant: "destructive"})}>ประวัติการเข้าสู่ระบบ</Link>
      </div>
      <div className="pt-5">
        <Card className="w-2/5 bg-stone-300 items-center space-y-[-3vh] pb-2">
          <CardHeader>
            <CardTitle className="text-sm font-medium pb-3">บัญชีทั้งหมดในระบบ</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            <p>{accounts}</p>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            <p>บัญชีล่าสุดถูกเพิ่มเข้าไปในระบบคือ <strong>{recentAccount?.username}</strong></p>
          </CardFooter>
        </Card>
      </div>
  </div>
  </PageWrapper>
};
export default page;