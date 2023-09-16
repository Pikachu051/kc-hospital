import Image from 'next/image'
import { Prompt } from 'next/font/google'
import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
import SignInForm from '@/components/form/SignInForm'
import { authOptions } from "@/lib/auth"; 
import { getServerSession } from "next-auth";


const page = async () => {
  const session = await getServerSession(authOptions);
    if (session?.user){
        return<div>
          <div className="z-10 w-full content-start fixed top-20 left-20">
            <p className='text-2xl pt-5'><strong className='text-3xl'>ระบบผู้ป่วยใน</strong><br></br>ยินดีต้อนรับ, คุณ {session.user.firstName}</p>
          </div>
          <div className='grid gap-[8rem] grid-cols-3 grid-rows-1'>
            <Button className='bg-red-400 w-[12rem] h-[8rem]'>กรอกข้อมูลผู้ป่วย</Button>
            <Button className='bg-red-400 w-[12rem] h-[8rem]'>ข้อมูลผู้ป่วย</Button>
            <Button className='bg-red-400 w-[12rem] h-[8rem]'>ข้อมูลการรักษา</Button>
          </div>
        </div>
    }

    return <h2 className="text-red-500 text-xl">กรุณาเข้าสู่ระบบก่อน</h2>;
}
export default page;