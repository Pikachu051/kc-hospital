import Image from 'next/image'
import { Prompt } from 'next/font/google'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import SignInForm from '@/components/form/SignInForm'
import { authOptions } from "@/lib/auth"; 
import { getServerSession } from "next-auth";

const prompt = Prompt({
  weight: ['400', '500', '700', '800'],
  subsets: ['thai']
})
const page = async () => {
  const session = await getServerSession(authOptions);
    if (session?.user){
        return <main className={prompt.className}>
        <div className="bg-stone-200 h-[28rem] w-96 rounded-md">
          <div className="object-center z-10 w-full items-center text-center justify-center lg:flex">
            <p className='text-2xl pt-5'><strong className='text-3xl'>ระบบจัดการผู้ป่วยใน</strong><br></br>ยินดีต้อนรับ คุณ {session.user.firstName}</p>
            
          </div>
          <div className='pl-2 pr-6 pt-3 w-full m-2 items-center justify-center'>
            
          </div>
        </div>
      </main>;
    }
    return <h2 className="text-red-500">กรุณาเข้าสู่ระบบก่อน</h2>;
}
export default page;