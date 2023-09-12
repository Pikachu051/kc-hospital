import Image from 'next/image'
import { Prompt } from 'next/font/google'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import SignInForm from '@/components/form/SignInForm'

const prompt = Prompt({
  weight: ['400', '500', '700', '800'],
  subsets: ['thai']
})
export default function Home() {
  return (
    <main className={prompt.className}>
      <div className="bg-stone-200 h-[27rem] w-96 rounded-md">
        <div className="object-center z-10 w-full items-center text-center justify-center lg:flex">
          <p className='text-2xl pt-5'><strong className='text-3xl'>โรงพยาบาลบ้านๆ</strong><br></br>ยินดีต้อนรับ</p>
          
        </div>
        <div className='pl-2 pr-6 pt-4 w-full m-2 items-center justify-center'>
          <SignInForm />
        </div>
      </div>
    </main>
  )
}