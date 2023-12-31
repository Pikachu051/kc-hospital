import Image from 'next/image'
import { Prompt } from 'next/font/google'
import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
import SignInForm from '@/components/form/SignInForm'
import { authOptions } from "@/lib/auth"; 
import { getServerSession } from "next-auth";
import { PageWrapper } from '@/components/PageWrapper'
import logo from '@/public/inpatient.png'

const page = async () => {
  const session = await getServerSession(authOptions);
    if (!session?.user) return

    return <PageWrapper>
    <div className='relative h-[75vh] w-[100vh]'>
      <div className="relative top-0 left-24 mt-0 pb-[5vh]">
        <p className='text-2xl pt-5 relative left-[-10vh]'><strong className='text-3xl'>ระบบผู้ป่วยใน</strong><br></br>ยินดีต้อนรับ, คุณ {session.user.firstName}</p>
      </div>
      <div className='flex justify-center pb-[10vh]'>
        <Image src={logo} alt='Inpatient logo' width={165} height={165} style={{maxWidth: '100%', height: 'auto',}}></Image>
      </div>
      <div className='justify-items-center grid gap-[8vem] grid-cols-3 grid-rows-1'>
        <Link href="/new-admit" className={buttonVariants({variant: "default"})}>แอดมิท</Link>
        <Link href="/patient-list" className={buttonVariants({variant: "default"})}>ตารางข้อมูลผู้ป่วยใน</Link>
        <Link href="/patient-edit" className={buttonVariants({variant: "default"})}>แก้ไขข้อมูลผู้ป่วย</Link>
      </div>
  </div>
  </PageWrapper>
}
export default page;